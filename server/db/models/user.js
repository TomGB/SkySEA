"use strict";
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function (value, next) {
          var self = this;
          User.find({where: {email: value}})
              .then(function (user) {
                // reject if a different user wants to use the same email
                if (user && self.id !== user.id) {
                  return next('Email already in use!');
                }
                return next();
              })
              .catch(function (err) {
                return next(err);
              });
        },
        isEmail: true
      }
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
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Order)
      },
      generateHash: function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function(password){
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return User;
};
