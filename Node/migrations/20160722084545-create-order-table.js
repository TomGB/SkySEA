'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('order',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          }
        });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('order');
  }
};
