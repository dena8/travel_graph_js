const sequelize = require("../config/sequelize");
const { Model, DataTypes, Sequelize } = require("sequelize");
const Category = require('./category');
const moment = require('moment');

class Tour extends Model {}

Tour.init(
  {
    id: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, validate:{notEmpty: true,len: [2,30],} },
    description: { type: DataTypes.STRING, allowNull: false },
    region: { type: DataTypes.STRING, allowNull: false },
    participants: { type: DataTypes.INTEGER, allowNull: false, validate:{ isInt: true, min:0 }},
    difficultyLevel: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: false, validate:{isFloat:true,min:0} },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue:true},
    startDate:{type:DataTypes.DATE, allowNull:false,get() {
      return moment(this.getDataValue('startDate')).format('DD/MM/YYYY');
  }}
  },
  {
    sequelize,
    modelName: 'Tour',
  }
);


Tour.belongsTo(Category,{
  foreignKey:'categoryId',
  as:'category'
})
module.exports = Tour;
