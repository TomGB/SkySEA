"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    imageurl: DataTypes.STRING,
    totalstock: DataTypes.INTEGER,
    availablestock: DataTypes.INTEGER,
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
