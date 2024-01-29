const Sequelize = require("sequelize");
module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: Sequelize.ENUM,
          values: ["회로물", "기구물", "전장물", "기타물"],
        },
        name: { type: Sequelize.STRING(50), allowNull: null },
        descript: { type: Sequelize.STRING(200), allowNull: true },
        unit: {
          type: Sequelize.ENUM,
          values: ["$", "￦", "￥"],
          defaultValue: "￦",
        },
        price: { type: Sequelize.FLOAT(11, 4), defaultValue: 0 },
        count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
        use: { type: Sequelize.BOOLEAN, defaultValue: true },
        supplyer: { type: Sequelize.STRING(10), allowNull: false },
        column: {
          type: Sequelize.ENUM,
          values: ["CUR", "LOW", "UPP"],
          defaultValue: "CUR",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "Item",
        tableName: "items",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Item.hasMany(db.Image);
  }
};
