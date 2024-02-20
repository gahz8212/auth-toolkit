const express = require("express");
const router = express.Router();
const { Good, Order } = require("../models");
const { sequelize } = require("../models");
router.get("/getOrderData", async (req, res) => {
  try {
    const [order, metadata] = await sequelize.query(
      `
    select * from ordersheet order by number1,number2
    `
    );
    console.log(order);
    return res.status(200).json(order);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/orderinput", async (req, res) => {
  try {
    const { order } = req.body;
    // console.log(order[0]);
    await Order.destroy({ where: {} });
    await Order.bulkCreate(order[0]);
    const [results, metadata] = await sequelize.query(
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
      goods.sets,
      goods.number1,
      goods.number2,
      goods.use,
      date_format(goods.input_date,'%Y-%m-%d')
      FROM goods inner join orders on goods.groupName=orders.Item
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

    //공부를 하면서 병행하면 더 좋은 방법을 익히고 사용할 수 있다.

    // await sequelize.query(`
    // drop table  if exists ordersheet
    // `);

    // await sequelize.query(`
    // create table if not exists ordersheet(
    //   name varchar(50) primary key,
    //   ${order[1][0]} integer null,
    //   ${order[1][1]} integer null,
    //   ${order[1][2]} integer null,
    //   ${order[1][3]} integer null,
    //   ${order[1][4]} integer null,
    //   sets varchar(10),
    //   cbm float(4,3),
    //   weight float(4,1),
    //   moq integer,
    //   export_price float(5,2),
    //  input_date date,
    //  number1 integer,
    //  number2 integer
    // )engine=innoDB default charset=utf8 collate=utf8_general_ci;
    // `);

    // let querystring = "";
    // results.forEach(async (result) => {
    //   const values = Object.values(result);
    //   querystring =
    //     querystring +
    //     ",(" +
    //     [
    //       "'" + values[1] + "'",
    //       values[3] | 0,
    //       values[4] | 0,
    //       values[5] | 0,
    //       values[6] | 0,
    //       values[7] | 0,
    //       "'" + values[14] + "'",
    //       values[12],
    //       values[11],
    //       values[13] | 0,
    //       values[10],
    //       "'" + values[18] + "'",
    //       values[15] | 0,
    //       values[16] | 0,
    //     ].toString() +
    //     ")";
    // });
    // //0:category
    // //1:name
    // //2:descript
    // //3:order #1
    // //4:order #2
    // //5:order #3
    // //6:order #4
    // //7:order #5
    // //8:unit
    // //9:import_price
    // //10:export_price
    // //11:weight
    // //12:cbm
    // //13:moq
    // //14:sets
    // //15:number1
    // //16:number2
    // //17:use
    // //18:input_date

    // sequelize.query(
    //   `insert into ordersheet (name,
    //     ${order[1][0]},
    //     ${order[1][1]},
    //     ${order[1][2]},
    //     ${order[1][3]},
    //     ${order[1][4]},
    //   sets,cbm,weight,moq,export_price,input_date,number1,number2) values ${querystring.slice(
    //     //처음에 붙은 , 삭제처리
    //     1
    //   )}`
    // );

    return res.status(200).json(results);
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
