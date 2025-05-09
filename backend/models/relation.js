const Sequelize = require("sequelize");
module.exports = class Relation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        point: { type: Sequelize.INTEGER },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Relation",
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
//아이템의 belongsToMany 관계의 through 모델이지만 point열을 넣어주기 위해 직접 지정함.
