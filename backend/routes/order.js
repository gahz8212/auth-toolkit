const express = require("express");
const router = express.Router();
const { Good, Order } = require("../models");
const { sequelize } = require("../models");
router.get("/getOrderData", async (req, res) => {
  try {
    const [order, metadata] = await sequelize.query(
      `
    select * from ordersheet order by number1,number2;
    `
    );

    return res.status(200).json(order);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.get("/getDummyItem", async (req, res) => {
  try {
    await sequelize.query(
      `
      drop table if exists dummies;
    `
    );
    await sequelize.query(
      `
      CREATE TABLE if not exists dummies 
      (SELECT groupname,NAME ,NUMBER1,NUMBER2 FROM goods  WHERE goods.use=TRUE AND NUMBER1 IS NOT NULL AND 
        CATEGORY IN ('RDT','EDT','NOBARK')  
        ORDER BY goods.NUMBER1,goods.NUMBER2);
    `
    );
    await sequelize.query(
      `
      alter table if exists dummies
      add count integer;
    `
    );
    await sequelize.query(
      `
      alter table if exists dummies
      add primary key(groupname);
    `
    );
    const [results] = await sequelize.query(
      `select * from dummies ORDER BY NUMBER1,NUMBER2`
    );
    // console.log(results);
    return res.status(200).json(results);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/orderinput", async (req, res) => {
  try {
    const { order } = req.body;
    console.log(order[0]);

    // await sequelize.query(
    //   `
    // delete from orders;
    // `
    // );
    // await Order.update(order[0])
    order[0].map(async (order) => {
      await Order.update(order, { where: { Item: order.Item } });
    });
    const [results, metadata] = await sequelize.query(
      `
      SELECT 
      goods.name,
      orders.${order[1][0]}, 
      orders.${order[1][1]}, 
      orders.${order[1][2]},
      orders.${order[1][3]},
      orders.${order[1][4]},
      goods.descript,
      goods.category,
      goods.unit,
      goods.import_price,
      goods.export_price,
      goods.weight,
      goods.cbm,
      goods.moq,
      goods.sets,
      goods.number1,
      goods.number2,
      goods.use,
      date_format(goods.input_date,'%Y-%m-%d')
      FROM goods right join orders on goods.groupName=orders.Item
      WHERE goods.use=1 
      ORDER BY goods.number1,goods.number2, orders.id
      `
    );

    await sequelize.query(`
    drop table  if exists ordersheet
    `);

    await sequelize.query(`
  create table ordersheet (
    SELECT 
    goods.name,
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
    goods.sets,
    goods.number1,
    goods.number2,
    goods.use,
    date_format(goods.input_date,'%Y-%m-%d')
    FROM goods inner join orders on goods.groupName=orders.Item
    WHERE goods.use=1 
    ORDER BY goods.number1,goods.number2, orders.id
  )
  `);

    return res.status(200).json(results);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
router.post("/goodinput", async (req, res) => {
  try {
    const { good } = req.body;
    await sequelize.query(
      `
    delete from goods;
    `
    );
    await Good.bulkCreate(good);
    return res.status(200).json("good_input_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
module.exports = router;
