'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('user',
        { id:
          {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          email: Sequelize.STRING,
          password: Sequelize.STRING,
          address1: Sequelize.TEXT,
          address2: Sequelize.TEXT,
          address3: Sequelize.TEXT,
          postcode: Sequelize.STRING,
          firstName: Sequelize.STRING,
          lastName: Sequelize.STRING,
          userRole: {
            type: Sequelize.ENUM,
            values: ['customer', 'admin', 'tech_support', 'manager'],
            defaultValue: 'customer'
          }
        });
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('user');
  }
};
