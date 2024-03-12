const Sequelize = require("sequelize");
module.exports = class Good extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        groupName: {
          type: Sequelize.STRING(50),
          primaryKey: true,
        },
        itemName: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Good",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Good.hasMany(db.GoodList, { foreignKey: "groupName" });
    db.Good.hasMany(db.ItemList, { foreignKey: "itemName" });
  }
};
