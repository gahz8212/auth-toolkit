const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Item, Image, Good, GoodList, sequelize } = require("../models");
const { Op } = require("sequelize");
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post("/images", upload.array("images"), async (req, res) => {
  try {
    const files = req.files.map((file) => ({ url: `/img/${file.filename}` }));
    return res.status(200).json(files);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/item", async (req, res) => {
  const {
    type,
    groupType,
    groupName,
    category,
    partsName,
    descript,
    unit,
    im_price,
    ex_price,
    use,
    supplyer,
    imageList,
  } = req.body;

  try {
    let item;
    //set가 들어오면 goodlist에
    //assy나 item이 들어오면 item에 입력
    //image는 image의 goodId에 입력
    if (type === "SET") {
      console.log(`${type}${groupType}${groupName}${category}가 들어옴`);
      return;
    } else {
      item = await Item.create({
        category,
        partsName,
        descript,
        unit,
        im_price,
        ex_price,
        use,
        supplyer,
      });
      const image_promise = await Promise.all(
        imageList.map((image) =>
          Image.create({ url: image.url, ItemId: item.id })
        )
      );
      item.addImages(image_promise.map((image) => image[0]));
      const newItem = await Item.findOne({
        where: { id: item.id }, //배열일 경우엔 where:{id:{[Op.in]:itemIds}} 또는 where:{id:itemIds}
        attributes: [
          "id",
          "category",
          "partsName",
          "descript",
          "unit",
          im_price,
          ex_price,
          "use",
          "supplyer",
        ],
        include: { model: Image, attributes: ["url"] },
      });

      return res.status(200).json(newItem);
    }
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.get("/items", async (req, res) => {
  try {
    const [items] = await sequelize.query(
      `
      select item.id,item.category,item.partsName ,item.im_price,item.unit,item.ex_price,
      null groupName
      from item 
      where item.use=true
      union
      select goodlist.id,goodlist.category,good.itemName,goodlist.im_price,goodlist.unit,goodlist.ex_price
      ,goodlist.groupName
      from goodlist inner join good on goodlist.groupName=good.groupName
      where goodlist.use=true
      order by id asc;
      `
    );
    const [images] = await sequelize.query(`
    select * from images
    `);
    // const items = await Promise.all([
    //   GoodList.findAll({
    //     where: { use: true },
    //     attributes: [
    //       "id",
    //       "category",
    //       "groupName",
    //       "descript",
    //       "unit",
    //       "im_price",
    //       "ex_price",
    //       "use",
    //     ],
    //     order: [["id", "asc"]],
    //   }),
    //   Item.findAll({
    //     where: {},
    //     attributes: [
    //       "id",
    //       "category",
    //       "partsName",
    //       "descript",
    //       "unit",
    //       "im_price",
    //       "ex_price",
    //       "use",
    //     ],
    //     order: [["id", "asc"]],
    //     include: { model: Image, attributes: ["url"] },
    //   }),
    // ]).then((unionReturn) => unionReturn.flat());
    // console.log(images);
    return res.status(200).json([items, images]);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
router.post("/edit", async (req, res) => {
  let { id, Images, ...rest } = req.body;
  try {
    id = parseInt(id, 10);

    await Item.update(rest, { where: { id } });
    if (Images) {
      await Image.destroy({ where: { ItemId: id } });
      Images.map((image) => Image.create({ url: image.url, ItemId: id }));
    }

    return res.status(200).json("edit_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
router.delete("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await Item.destroy({ where: { id } });
    return res.status(200).json("remove_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
router.post("/excelAdd", async (req, res) => {
  const datas = req.body;
  try {
    if (datas) {
      const results = await Item.bulkCreate(datas);
      const resultIds = results.map((result) => result.id);

      const finddatas = await Item.findAll({
        where: { id: resultIds },
        include: { model: Image },
      });

      return res.status(200).json(finddatas);
    }
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
module.exports = router;
