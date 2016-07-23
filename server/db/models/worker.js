"use strict";

module.exports = function(sequelize, DataTypes) {
  var Worker = sequelize.define("Worker", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email:  DataTypes.STRING,
    password:  DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        Worker.hasMany(models.Order)
      }
    }
  });

  return Worker;
};
