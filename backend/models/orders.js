const Sequelize = require("sequelize");
module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        model: { type: Sequelize.STRING(50), allowNull: true },
        Jan: { type: Sequelize.INTEGER, allowNull: true },
        Feb: { type: Sequelize.INTEGER, allowNull: true },
        Mar: { type: Sequelize.INTEGER, allowNull: true },
        April: { type: Sequelize.INTEGER, allowNull: true },
        May: { type: Sequelize.INTEGER, allowNull: true },
        June: { type: Sequelize.INTEGER, allowNull: true },
        Jul: { type: Sequelize.INTEGER, allowNull: true },
        Aug: { type: Sequelize.INTEGER, allowNull: true },
        Sep: { type: Sequelize.INTEGER, allowNull: true },
        Oct: { type: Sequelize.INTEGER, allowNull: true },
        Nov: { type: Sequelize.INTEGER, allowNull: true },
        Dec: { type: Sequelize.INTEGER, allowNull: true },
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
