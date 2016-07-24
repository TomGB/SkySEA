'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('workers', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('workers');
  }
};
