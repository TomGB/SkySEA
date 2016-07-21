"use strict";

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    status: DataTypes.STRING,
    orderdate: DataTypes.DATE,
    dispatchdate: DataTypes.DATE,
  }, {
    classMethods: {
      associate: function(models) {
        Order.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Order.belongsTo(models.Worker, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Order.hasMany(models.ProductOrder);
      }
    }
  });

  return Order;
};
