const Sequelize = require("sequelize");
module.exports = class GoodList extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        type: { type: Sequelize.STRING(10) },
        groupType: { type: Sequelize.STRING(10) },
        itemName: { type: Sequelize.STRING(50), unique: true },
        descript: { type: Sequelize.STRING(200), allowNull: true },
        category: { type: Sequelize.STRING(30) },
        unit: {
          type: Sequelize.STRING(3),
          defaultValue: "\\",
        },
        im_price: { type: Sequelize.FLOAT(9, 2), allowNull: true },
        ex_price: { type: Sequelize.FLOAT(9, 3), allowNull: true },
        weight: { type: Sequelize.FLOAT(5, 2), defaultValue: 0 },
        cbm: { type: Sequelize.FLOAT(4, 3), defaultValue: 0 },
        moq: { type: Sequelize.INTEGER, defaultValue: 0 },
        sets: { type: Sequelize.STRING(3), defaultValue: "SET" },
        number1: { type: Sequelize.INTEGER, allowNull: true },
        number2: { type: Sequelize.INTEGER, allowNull: true },
        use: { type: Sequelize.BOOLEAN, defaultValue: true },
        input_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      },
      {
        sequelize,
        hooks: {
          afterUpdate: async (good) => {
            sequelize.models.GoodBackup.create({
              itemName: good.itemName,
              price: good.previous().price,
              GoodId: good.id,
            });
          },
        },
        timestamps: true,
        underscored: false,
        paranoid: true,
        modelName: "GoodList",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.GoodList.belongsTo(db.Good);
    db.GoodList.hasMany(db.Item);
  }
};
