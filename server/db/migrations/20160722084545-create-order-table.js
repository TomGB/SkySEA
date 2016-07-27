'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('orders',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          status: Sequelize.STRING,
          orderDate: Sequelize.DATE,
          dispatchDate: Sequelize.DATE,
          userID: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            }
          },
          workerID: {
            type: Sequelize.INTEGER,
            references: {
              model: 'workers',
              key: 'id',
              allowNull: 'true'
            }
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('orders');
  }
};
