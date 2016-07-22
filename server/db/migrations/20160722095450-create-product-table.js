'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('product',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: Sequelize.STRING,
          price:
          {
            type: Sequelize.FLOAT,
            allowNull: false,
            default: 0.0
          },
          imgUrl: Sequelize.STRING,
          totalStock: Sequelize.INTEGER,
          availStock: Sequelize.INTEGER,
          productTypeID: {
            type: Sequelize.INTEGER,
            references: {
              model: 'productType',
              key: 'id'
            }
          }
        });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
