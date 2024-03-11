const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};
const User = require("./user");
const Item = require("./item");
const Image = require("./image");
const Good = require("./good");
const GoodList = require("./goodlist");
const Order = require("./orders");

// const OrderSheet = require("./ordersheet");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Item = Item;
db.Image = Image;
db.Good = Good;
db.GoodList = GoodList;
db.Order = Order;
// db.OrderSheet = OrderSheet;
User.init(sequelize);
Item.init(sequelize);
Image.init(sequelize);
Good.init(sequelize);
GoodList.init(sequelize);
Order.init(sequelize);

Item.associate(db);
Image.associate(db);

module.exports = db;
