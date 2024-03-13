const Sequelize=require('sequelize')
module.exports=class GoodBackup extends Sequelize.Model{
    static init(sequelize){
        return super.init({
        largeCategory: { type: Sequelize.STRING(10) },
        middleCategory: { type: Sequelize.STRING(10) },
        category: { type: Sequelize.STRING(30) },
        descript: { type: Sequelize.STRING(200), allowNull: true },
        unit: {
          type: Sequelize.STRING(3),
          defaultValue: "\\",
        },
        import_price: { type: Sequelize.FLOAT(9, 2), allowNull: true },
        export_price: { type: Sequelize.FLOAT(9, 3), allowNull: true },
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
          timestamps: true,
          underscored: false,
          paranoid: false,
          modelName: "GoodBackup",
          freezeTableName: true,
          charset: "utf8",
          collate: "utf8_general_ci",
        })
    }
    static associate(db){
        db.GoodBackup.belongsTo(db.GoodList)
    }
}