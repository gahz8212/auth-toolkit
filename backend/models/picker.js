const Sequelize = require("sequelize");
module.exports = class Picker extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        check: { type: Sequelize.BOOLEAN, defaultValue: false },
        itemName: { type: Sequelize.STRING(50), allowNull: false },
        unit: { type: Sequelize.STRING(3), allowNull: false },
        im_price: { type: Sequelize.FLOAT(9, 2), allowNull: true },
        ex_price: { type: Sequelize.FLOAT(9, 3), allowNull: true },
        supplyer: { type: Sequelize.STRING(50), allowNull: true },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Picker",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Picker.belongsTo(db.Item);
  }
};
