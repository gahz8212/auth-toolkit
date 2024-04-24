const Sequelize = require("sequelize");
module.exports = class ItemList extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        itemName: { type: Sequelize.STRING(50), allowNull: null },
        point: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "ItemList",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.ItemList.belongsTo(db.Item);
    db.ItemList.belongsTo(db.Good, { foreignKey: "itemName" });
  }
};
