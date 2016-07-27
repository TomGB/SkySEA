"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    imageUrl: DataTypes.STRING,
    totalStock: DataTypes.INTEGER,
    productTypeID: DataTypes.STRING,
    availableStock: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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
