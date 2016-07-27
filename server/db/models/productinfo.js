"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductInfo = sequelize.define("ProductInfo", {
    infoName: DataTypes.STRING,
    infoValue: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    productID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        ProductInfo.belongsTo(models.Product, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    },
    tableName:'productinfo'
  });

  return ProductInfo;
};
