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
        value: Sequelize.STRING,
          createdAt: Sequelize.TIMESTAMP,
          updatedAt: Sequelize.TIMESTAMP,
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('productInfo');
  }
};
