const Sequelize = require("sequelize");
module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        model: { type: Sequelize.STRING(50), allowNull: false },
        count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
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
  static associate(db) {
    db.Order.belongsTo(db.Good);
  }
};
