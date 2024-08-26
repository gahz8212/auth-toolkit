const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};
const User = require("./user");
const Item = require("./item");
const Image = require("./image");
const Good = require("./good");
const Order = require("./orders");
const GoodBackup = require("./good-backup");
const ItemBackup = require("./item-backup");
const Relation = require("./relation");
const Pallet = require("./pallet");

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
db.GoodBackup = GoodBackup;
db.ItemBackup = ItemBackup;
db.Relation = Relation;
db.Pallet = Pallet;
// db.OrderSheet = OrderSheet;
User.init(sequelize);
Item.init(sequelize);

Image.init(sequelize);
Good.init(sequelize);
GoodBackup.init(sequelize);
ItemBackup.init(sequelize);
Order.init(sequelize);
Relation.init(sequelize);
Pallet.init(sequelize);

Image.associate(db);
Good.associate(db);

GoodBackup.associate(db);
Item.associate(db);
module.exports = db;
