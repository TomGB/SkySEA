"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    imageUrl: DataTypes.STRING,
    totalStock: DataTypes.INTEGER,
    availableStock: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsTo(models.ProductType, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Product.hasMany(models.ProductInfo);
        Product.hasMany(models.ProductOrder);
      }
    }
  });

  return Product;
};