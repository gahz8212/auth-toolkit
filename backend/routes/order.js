const express = require("express");
const router = express.Router();
const { Good, Order } = require("../models");
router.post("/orderinput", async (req, res) => {
  try {
    const { order } = req.body;
    // console.log(order);

    await Order.destroy({ where: {} });
    const result = await Order.bulkCreate(order);

    const datas = await Order.findAll({
      where: {},
      include: { model: Good,where:{} },
    });
    console.log(datas);

    return res.status(200).json("order_input_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
router.post("/goodinput", async (req, res) => {
  try {
    const { good } = req.body;
    // console.log(order);
    await Good.destroy({ where: {} });
    const result = await Good.bulkCreate(good);
    return res.status(200).json("good_input_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
module.exports = router;
