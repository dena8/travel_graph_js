const sequelize = require("../config/sequelize");
const { Model, DataTypes, Sequelize } = require("sequelize");
const Tour = require('./tour');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, validate:{notEmpty: true,len: [4,10]} },
  },
  {
    sequelize,
    modelName: "Category",
  }
);


module.exports=Category;
