"use strict";

module.exports = function(sequelize, DataTypes) {
  var ProductType = sequelize.define("ProductType", {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        ProductType.hasMany(models.Product);
      }
    },
    tableName: 'producttypes'

  });

  return ProductType;
};
