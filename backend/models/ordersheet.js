const Sequelize = require("sequelize");
module.exports = class OrderSheet extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
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
        category: { type: Sequelize.STRING(30) },
        name: { type: Sequelize.STRING(100), allowNull: false },
        descript: { type: Sequelize.STRING(200), allowNull: true },
        unit: {
          type: Sequelize.STRING(3),
          defaultValue: "\\",
        },
        import_price: { type: Sequelize.FLOAT(9, 2), allowNull: true },
        export_price: { type: Sequelize.FLOAT(9, 3), allowNull: true },
        weight: { type: Sequelize.FLOAT(4, 2), defaultValue: 0 },
        cbm: { type: Sequelize.FLOAT(4, 3), defaultValue: 0 },
        moq: { type: Sequelize.INTEGER, defaultValue: 0 },
        set: { type: Sequelize.STRING(3), defaultValue: "SET" },
        number: { type: Sequelize.INTEGER, allowNull: true },
        use: { type: Sequelize.BOOLEAN, defaultValue: true },
        input_date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: false,
        tableName: "OrderSheet",
        modelName: "ordersheets",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
