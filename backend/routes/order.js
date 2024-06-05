const express = require("express");
const router = express.Router();
const { Good, Item, Order } = require("../models");
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
      (SELECT itemName,NAME ,NUMBER1,NUMBER2 FROM goods  WHERE goods.use=TRUE AND NUMBER1 IS NOT NULL AND 
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
      add primary key(itemName);
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
    delete from order;
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
      L.im_price,
      L.ex_price,
      L.weight,
      L.cbm,
      L.moq,
      L.sets,
      L.number1,
      L.number2,
      L.use,
      date_format(L.input_date,'%Y-%m-%d')
      FROM good G inner join goodlist L on G.id=L.id right join order O on G.groupName=O.Item
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
    L.im_price,
    L.ex_price,
    L.weight,
    L.cbm,
    L.moq,
    L.sets,
    L.number1,
    L.number2,
    L.use,
    date_format(L.input_date,'%Y-%m-%d')
    FROM good G inner join goodlist L on G.id=L.id right join order O on G.groupName=O.Item
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
    if (Object.keys(good[0]).includes("undefined")) {
      throw new Error("오더리스트를 선택함.");
    }
    if (Object.keys(good[0]).includes("groupName")) {
      await sequelize.query(
        `
      delete from good;
      `
      );
      if (Array.isArray(good)) {
        await Good.bulkCreate(good);
      }
    } else if (Object.keys(good[0]).includes("itemName")) {
      if (Array.isArray(good)) {
        good.map(async (item) => {
          await Item.upsert({
            type: item.type,
            itemName: item.itemName,
            groupType: item.groupType,
            descript: item.descript,
            category: item.category,
            unit: item.unit,
            im_price: item.im_price,
            ex_price: item.ex_price,
            weight: item.weight,
            cbm: item.cbm,
            moq: item.moq,
            sets: item.sets,
            number1: item.number1,
            number2: item.number2,
            user: item.use,
            input_date: item.input_date,
          });
        });
      } else {
        const good = await Good.findOne({ where: { itemName: good.itemName } });
        if (good) {
          //update;
        } else {
          //create
        }
      }
    }
    return res.status(200).json("good_input_ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});

module.exports = router;
