const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};
const User = require("./user");
const Item = require("./item");
const ItemList = require("./itemlist");
const Image = require("./image");
const Good = require("./good");
const GoodList = require("./goodlist");
const Order = require("./orders");
const GoodBackup = require("./good-backup");
const ItemBackup = require("./item-backup");

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
db.ItemList = ItemList;
db.Image = Image;
db.Good = Good;
db.GoodList = GoodList;
db.Order = Order;
db.GoodBackup = GoodBackup;
db.ItemBackup = ItemBackup;
// db.OrderSheet = OrderSheet;
User.init(sequelize);
Item.init(sequelize);
ItemList.init(sequelize);
Image.init(sequelize);
Good.init(sequelize);
GoodList.init(sequelize);
GoodBackup.init(sequelize);
ItemBackup.init(sequelize);
Order.init(sequelize);

Image.associate(db);
Item.associate(db);
ItemList.associate(db);
ItemBackup.associate(db);
Good.associate(db);
GoodList.associate(db);
GoodBackup.associate(db);
module.exports = db;
