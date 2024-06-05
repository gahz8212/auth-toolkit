const Sequelize = require("sequelize");
module.exports = class Good extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        groupName: {
          type: Sequelize.STRING(50),
          unique: true,
        },
        itemName: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        hooks: {
          afterBulkCreate: async (goods) => {
            goods.forEach((good) => {
              sequelize.models.GoodList.upsert({
                itemName: good.itemName,
                GoodId: good.id,
              });
            });
          },
          afterCreate: async () => {},
        },
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
    db.Good.hasMany(db.GoodList);
    db.Good.hasMany(db.Image);
  }
};
