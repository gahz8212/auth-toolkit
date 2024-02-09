const Sequelize = require("sequelize");
module.exports = class Good extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        largeCategory: { type: Sequelize.STRING(10) },
        middleCategory: { type: Sequelize.STRING(10) },
        category: { type: Sequelize.STRING(30) },
        groupName: { type: Sequelize.STRING(50) },
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
        input_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "Good",
        tableName: "goods",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Good.hasMany(db.Order);
  }
};
