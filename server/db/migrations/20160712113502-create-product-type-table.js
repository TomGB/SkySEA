'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('productTypes', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: Sequelize.STRING
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('productType');
  }
};
