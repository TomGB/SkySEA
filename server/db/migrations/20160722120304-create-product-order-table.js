'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('productOrders', {
        orderID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'orders',
            key: 'id'
          }
        },
        productID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id'
          }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('productOrders');
  }
};
