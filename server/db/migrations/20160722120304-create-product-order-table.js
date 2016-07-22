'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('productOrder', {
        orderID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'order',
            key: 'id'
          }
        },
        productID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'product',
            key: 'id'
          }
        },
        createdAt: Sequelize.TIMESTAMP,
        updatedAt: Sequelize.TIMESTAMP,
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('productOrder');
  }
};
