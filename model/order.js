const sequelize = require("../config/sequelize");
const { Model, DataTypes, Sequelize } = require("sequelize");
const Tour = require("./tour");
const User = require("./user");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    buyDate: {
      type: DataTypes.DATE,
      allowNull: false,      
    },
    isConfirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

Order.belongsToMany(Tour, {
  foreignKey: "order_id",
  as: "buyingProducts",
  through: "orders_buying_products",
});

Tour.belongsToMany(Order, {
  foreignKey: "buying_products_id",
  as: "order",
  through: "orders_buying_products",
});

Order.belongsTo(User, {
  foreignKey: "customer_id",
  as: "customer",
});

module.exports = Order;
