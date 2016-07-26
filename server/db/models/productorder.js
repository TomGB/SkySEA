"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductOrder = sequelize.define("ProductOrder", {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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
    tableName: 'productorder'

  });

  return ProductOrder;
};
