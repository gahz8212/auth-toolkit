const express = require("express");
const router = express.Router();
const { GoodList, Good, Order } = require("../models");
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
    // console.log(order[0]);

    await sequelize.query(
      `
    delete from orders;
    `
    );
    await Order.bulkCreate(order[0]);
    const [results, metadata] = await sequelize.query(
      `
      SELECT 
      G.itemName,
      O.${order[1][0]}, 
      O.${order[1][1]}, 
      O.${order[1][2]},
      O.${order[1][3]},
      O.${order[1][4]},
      L.descript,
      L.category,
      L.unit,
      L.import_price,
      L.export_price,
      L.weight,
      L.cbm,
      L.moq,
      L.sets,
      L.number1,
      L.number2,
      L.use,
      date_format(L.input_date,'%Y-%m-%d')
      FROM good G inner join goodlist L on G.groupName=L.groupName right join orders O on G.groupName=O.Item
      WHERE L.use=1 
      ORDER BY L.number1,L.number2
      `
    );

    await sequelize.query(`
    drop table  if exists ordersheet
    `);

    await sequelize.query(`
  create table ordersheet (
    SELECT 
    G.itemName ,
    O.${order[1][0]}, 
    O.${order[1][1]}, 
    O.${order[1][2]},
    O.${order[1][3]},
    O.${order[1][4]},
    L.descript,
    L.category,
    L.unit,
    L.import_price,
    L.export_price,
    L.weight,
    L.cbm,
    L.moq,
    L.sets,
    L.number1,
    L.number2,
    L.use,
    date_format(L.input_date,'%Y-%m-%d')
    FROM good G inner join goodlist L on G.groupName=L.groupName right join orders O on G.groupName=O.Item
    WHERE L.use=1 
    ORDER BY L.number1,L.number2
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
    // console.log(good);
    await sequelize.query(
      `
    delete from goodlist;
    `
    );
    await GoodList.bulkCreate(good);
    return res.status(200).json("good_input_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
module.exports = router;
