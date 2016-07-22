'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('productInfo', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        key: Sequelize.STRING,
        value: Sequelize.STRING
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('productInfo');
  }
};
