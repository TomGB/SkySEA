"use strict";

module.exports = function(sequelize, DataTypes) {
  var Worker = sequelize.define("Worker", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email:  DataTypes.STRING,
    password:  DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        Worker.hasMany(models.Order)
      }
    },
    tableName: 'worker'

  });

  return Worker;
};
