'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('productOrders', {
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
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('productOrder');
  }
};
