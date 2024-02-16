const express = require("express");
const router = express.Router();
const { Good, Order, OrderSheet } = require("../models");
const { sequelize } = require("../models");
router.get("/getOrderData", async (req, res) => {
  try {
    const [order, metadata] = await sequelize.query(
      `
    select * from orders
    `
    );
    // console.log(ordersheet);
    return res.status(200).json(order);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/orderinput", async (req, res) => {
  try {
    const { order } = req.body;
    console.log(order[0]);
    await Order.destroy({ where: {} });
    await Order.bulkCreate(order[0]);
    const [result, metadata] = await sequelize.query(
      `
      SELECT 
      goods.category,
      goods.name,
      goods.descript,
      orders.${order[1][0]}, 
      orders.${order[1][1]}, 
      orders.${order[1][2]},
      orders.${order[1][3]},
      orders.${order[1][4]},
      goods.unit,
      goods.import_price,
      goods.export_price,
      goods.weight,
      goods.cbm,
      goods.moq,
      goods.set,
      goods.number,
      goods.use,
      goods.input_date
      FROM goods inner join orders on goods.groupName=orders.Item
      WHERE goods.use=1 
      ORDER BY goods.number,orders.id
      `
    );
    await OrderSheet.destroy({ where: {} });
    await OrderSheet.bulkCreate(result);
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
    return res.status(200).json("good_input_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
module.exports = router;
