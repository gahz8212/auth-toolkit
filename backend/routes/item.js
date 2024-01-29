const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Item, Image } = require("../models");
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
    category,
    name,
    descript,
    unit,
    price,
    count,
    use,
    supplyer,

    imageList,
  } = req.body;
  try {
    const item = await Item.create({
      category,
      name,
      descript,
      unit,
      price,
      count,
      use,
      supplyer,
    });
    const image_promise = await Promise.all(
      imageList.map((image) =>
        Image.create({ url: image.url, ItemId: item.id })
      )
    );
    item.addImages(image_promise.map((image) => image[0]));
    const newItem = await Item.findAll({
      where: { id: item.id },
      attributes: [
        "id",
        "category",
        "name",
        "descript",
        "unit",
        "price",
        "count",
        "use",
        "supplyer",
      ],
      include: { model: Image, attributes: ["url"] },
    });

    return res.status(200).json(newItem);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.get("/items", async (req, res) => {
  try {
    const items = await Item.findAll({
      where: {},
      attributes: [
        "id",
        "category",
        "name",
        "descript",
        "unit",
        "price",
        "count",
        "use",
        "supplyer",
      ],
      order: [["id", "ASC"]],
      include: { model: Image, attributes: ["url"] },
    });

    return res.status(200).json(items);
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
module.exports = router;
