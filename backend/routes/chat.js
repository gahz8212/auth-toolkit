const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Chat, User } = require("../models");
const { Op } = require("sequelize");

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    filename(req, file, cb) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, file.originalname);
    },
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
  }),
});
router.post("/images", upload.array("images"), async (req, res) => {
  try {
    const files = req.files.map((file) => ({ url: `/img/${file.filename}` }));

    const user = await User.findOne({ where: { id: req.user.id } });

    const images = files.map((file) => file.url).toString();
    const image = await Chat.create({ image: images, name: req.user.name });
    user.addChat(image);
    // console.log(
    images.split(",").map((image) => ({
      url: `${image}`,
    }));
    console.log("images", images);
    // const { id } = req.params;
    req.app.get("io").emit("chat", { name: req.user.name, image: images });

    return res.status(200).json("image_ok");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/chat", async (req, res) => {
  // const { id } = req.params;
  const { message } = req.body;
  const user = await User.findOne({ where: { id: req.user.id } });
  const chats = await Chat.create({ chat: message, name: req.user.name });
  user.addChats(chats);
  req.app
    .get("io")
    .to("chat")
    .emit("chat", { chat: message, name: req.user.name });
  return res.send("ok");
});
router.get("/all", async (req, res) => {
  try {
    const startDay = new Date();
    const endDay = new Date();
    startDay.setDate(startDay.getDate() - 1);
    endDay.setDate(endDay.getDate());

    const chats = await Chat.findAll({
      where: {
        createdAt: { [Op.between]: [startDay, endDay] },
      },
    });

    return res.status(200).json(chats);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
module.exports = router;
