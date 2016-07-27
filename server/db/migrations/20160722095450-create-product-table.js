'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('products',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: Sequelize.STRING,
          price:
          {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            default: 0.0
          },
          imageUrl: Sequelize.STRING,
          totalStock: Sequelize.INTEGER,
          availableStock: Sequelize.INTEGER,
          description: Sequelize.TEXT,
          productTypeID: {
            type: Sequelize.INTEGER,
            references: {
              model: 'productTypes',
              key: 'id'
            }
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE
        });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('products');
  }
};
