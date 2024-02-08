const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};
const User = require("./user");
const Item = require("./item");
const Image = require("./image");
const Good = require("./goods");
const Order = require("./orders");
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
db.Order = Order;
User.init(sequelize);
Item.init(sequelize);
Image.init(sequelize);
Good.init(sequelize);
Order.init(sequelize);
Item.associate(db);
Image.associate(db);
Good.associate(db);
Order.associate(db);

module.exports = db;
