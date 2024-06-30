const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Item, Image, Good, Relation } = require("../models");
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
    descript,
    category,
    unit,
    im_price,
    ex_price,
    weight,
    cbm,
    moq,
    sets,
    use,
    supplyer,
    groupName,
    itemName,
    imageList,
  } = req.body;

  try {
    let item;
    let good;
    //set가 들어오면 Item에
    //assy나 item이 들어오면 item에 입력
    //image는 image의 goodId에 입력
    if (type === "SET") {
      good = await Good.create({
        groupName,
        itemName,
      });
      item = await Item.create({
        type,
        groupType,
        descript,
        category,
        unit,
        im_price,
        ex_price,
        weight,
        cbm,
        moq,
        use,
        supplyer,
        groupName,
      });
      // const newItem = await Item.findOne({
      //   where: { id: item.id }, //배열일 경우엔 where:{id:{[Op.in]:itemIds}} 또는 where:{id:itemIds}
      //   attributes: [
      //     "id",
      //     "category",
      //     "itemName",
      //     "im_price",
      //     "unit",
      //     "ex_price",
      //     "groupName",
      //     "groupType",
      //     "weight",
      //     "cbm",
      //     "moq",
      //     "sets",
      //   ],
      // });

      return;
    } else if (type === "ASSY") {
      item = await Item.create({
        category,
        type,
        itemName,
        descript,
        unit,
        im_price,
        ex_price,
        use,
        weight,
        cbm,
        moq,
        supplyer,
      });
    } else {
      console.log("parts");
      item = await Item.create({
        category,
        type,
        itemName,
        descript,
        unit,
        im_price,
        ex_price,
        use,
        weight,
        cbm,
        moq,
        supplyer,
      });
      const image_promise = await Promise.all(
        imageList.map((image) =>
          Image.create({ url: image.url, ItemId: item.id })
        )
      );
      item.addImage(image_promise.map((image) => image[0]));

      const newItem = await Item.findOne({
        where: { id: item.id }, //배열일 경우엔 where:{id:{[Op.in]:itemIds}} 또는 where:{id:itemIds}
        attributes: [
          "id",
          "category",
          "type",
          "itemName",
          "descript",
          "unit",
          "im_price",
          "ex_price",
          "use",
          "supplyer",
        ],
        include: { model: Image, attributes: ["url"] },
      });
      console.log("newItem:", newItem);
      return res.status(200).json(newItem);
    }
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.get("/items", async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { use: true },
      attributes: [
        "id",
        "type",
        "groupType",
        "itemName",
        "descript",
        "category",
        "unit",
        "im_price",
        "sum_im_price",
        "ex_price",
        "weight",
        "cbm",
        "moq",
        "sets",
        "number1",
        "number2",
        "use",
        "supplyer",
      ],
      include: [
        { model: Image, attributes: ["url"] },
        { model: Good, attributes: ["groupName"] },
      ],
      // include:{model:Good,attributes:['groupName']},
      order: [["id", "asc"]],
    });
    const relations = await Relation.findAll();
    return res.status(200).json([items, relations]);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
router.post("/edit", async (req, res) => {
  let { id, Images, dragItems, ...rest } = req.body;

  const relations = dragItems.map((dragItem) => ({
    LowerId: dragItem.id,
    UpperId: dragItem.targetId,
    point: dragItem.point,
  }));
  // console.log("relations", relations);
  try {
    id = parseInt(id, 10);
    await Item.update(rest, { where: { id } });
    if (Images) {
      await Image.destroy({ where: { ItemId: id } });
      Images.map((image) => Image.create({ url: image.url, ItemId: id }));
    }
    if (relations) {
      await Relation.destroy({ where: { UpperId: id } });
      relations.map((rel) =>
        Relation.create({
          UpperId: rel.UpperId,
          LowerId: rel.LowerId,
          point: rel.point,
        })
      );
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
