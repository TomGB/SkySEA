"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductOrder = sequelize.define("ProductOrder", {

  }, {
    classMethods: {
      associate: function(models) {
        ProductOrder.belongsTo(models.Order, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        ProductOrder.belongsTo(models.Product, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return ProductOrder;
};
