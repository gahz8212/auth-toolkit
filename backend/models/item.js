const Sequelize = require("sequelize");
module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: Sequelize.ENUM,
          values: ["결합", "회로", "기구", "전장", "포장", "기타"],
        },
        partsName: { type: Sequelize.STRING(50), allowNull: null },
        descript: { type: Sequelize.STRING(200), allowNull: true },
        unit: {
          type: Sequelize.ENUM,
          values: ["$", "\\", "￥"],
          defaultValue: "\\",
        },
        im_price: { type: Sequelize.FLOAT(11, 4), defaultValue: 0 },
        ex_price: { type: Sequelize.FLOAT(11, 4), defaultValue: 0 },
        use: { type: Sequelize.BOOLEAN, defaultValue: true },
        supplyer: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "Item",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Item.hasMany(db.Image);
    db.Item.hasMany(db.ItemList);
    db.Item.belongsToMany(db.Item, { through: "relations", as: "upper" });
  }
};
