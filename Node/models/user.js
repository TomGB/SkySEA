"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    address3: DataTypes.STRING,
    postcode: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    userrole: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Order)
      }
    }
  });

  return User;
};