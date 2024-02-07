const Sequelize = require("sequelize");
module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: { type: Sequelize.STRING(100), unique: true, allowNull: false },
        descript: { type: Sequelize.STRING(200), allowNull: true },
        unit: {
          type: Sequelize.ENUM,
          values: ["$", "\\", "￥"],
          defaultValue: "\\",
        },
        import_price: { type: Sequelize.FLOAT(9, 2), defaultValue: 0 },
        export_price: { type: Sequelize.FLOAT(9, 3), defaultValue: 0 },
        count: { type: Sequelize.INTEGER, defaultValue: 0 },
        cbm: { type: Sequelize.FLOAT(4, 3), defaultValue: 0 },
        weight: { type: Sequelize.FLOAT(3, 2), defaultValue: 0 },
        moq: { type: Sequelize.INTEGER, defaultValue: 0 },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "Order",
        tableName: "orders",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
