const Sequelize = require("sequelize");
module.exports = class Good extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        groupName: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
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
        tableName: "goods",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
