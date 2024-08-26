const Sequelize = require("sequelize");
module.exports = class Pallet extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        no: { type: Sequelize.INTEGER, allowNull: true },
        item: { type: Sequelize.STRING(50), allowNull: true },
        ct: { type: Sequelize.INTEGER, allowNull: true },
        weight: { type: Sequelize.INTEGER, allowNull: true },
        cbm: { type: Sequelize.INTEGER, allowNull: true },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        modelName: "Pallet",
        tableName: "pallet",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
