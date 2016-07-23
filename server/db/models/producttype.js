"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductType = sequelize.define("ProductType", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        ProductType.hasMany(models.Product);
      }
    },
    tableName: 'producttype'

  });

  return ProductType;
};
