const express = require("express");
const router = express.Router();
const { Good, Order } = require("../models");
const { sequelize } = require("../models");
router.post("/orderinput", async (req, res) => {
  try {
    const { order } = req.body;
    // console.log(order);

    await Order.destroy({ where: {} });
    await Order.bulkCreate(order);
    let feb = "feb";
    const [result, metadata] = await sequelize.query(
      `select orders.Item,goods.export_price as price,orders.${feb} as count,goods.export_price*orders.feb as amount,goods.use 
      from goods inner join orders on goods.groupName=orders.Item
      where goods.use=1 and orders.feb>0`
    );
    // console.log(result);

    return res.status(200).json(result);
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
    await Good.bulkCreate(good);

    // const datas = await Good.findAll({
    //   where: {},
    //   include: [
    //     {
    //       model: Order,
    //       required: false,
    //       on: { Item: Sequelize.col("CC 360") },
    //     },
    //   ],
    // });

    // console.log(datas);

    return res.status(200).json("good_input_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
module.exports = router;
