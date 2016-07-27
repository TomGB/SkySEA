"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductOrder = sequelize.define("ProductOrder", {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    orderID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER
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
    },
    tableName: 'productorders'

  });

  return ProductOrder;
};
