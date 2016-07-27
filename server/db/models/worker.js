"use strict";

module.exports = function(sequelize, DataTypes) {
  var Worker = sequelize.define("Worker", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email:  DataTypes.STRING,
    password:  DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

  }, {
    classMethods: {
      associate: function(models) {
        Worker.hasMany(models.Order)
      },
      generateHash: function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
    },
    instanceMethods: {
      validPassword: function(password){
        return bcrypt.compareSync(password, this.password);
      }
    },
    tableName: 'worker'

  });
  return Worker;
};
