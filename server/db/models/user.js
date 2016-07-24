"use strict";
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
    address1: DataTypes.TEXT,
    address2: DataTypes.TEXT,
    address3: DataTypes.TEXT,
    postcode: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userRole: {
      type: DataTypes.ENUM,
      values: ['customer', 'admin', 'tech_support', 'manager'],
      defaultValue: 'customer'
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Order)
      },
      generateHash: function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
    },
    instanceMethods: {
      validPassword: function(password){
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return User;
};
