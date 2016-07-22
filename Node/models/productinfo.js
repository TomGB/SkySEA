"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductInfo = sequelize.define("ProductInfo", {
    key: DataTypes.STRING,
    value: DataTypes.STRING
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
    }
  });

  return ProductInfo;
};
