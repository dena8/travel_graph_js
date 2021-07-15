const sequelize = require("../config/sequelize");
const { Model, DataTypes, Sequelize} = require("sequelize");
const User = require("./user");

class Authority extends Model {}

Authority.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    authority: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Authority",
  }
);

User.belongsTo(Authority, {
  foreignKey: "authorityId",
  as: "authority",
});

module.exports = Authority;
