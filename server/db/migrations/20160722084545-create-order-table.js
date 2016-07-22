'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('order',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          status: Sequelize.STRING,
          orderDate: Sequelize.DATE,
          dispatchDate: Sequelize.DATE,
          workerID: {
            type: Sequelize.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            }
          },
        });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('order');
  }
};
