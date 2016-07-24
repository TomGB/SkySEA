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
            type: Sequelize.DECIMAL,
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
        });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('products');
  }
};
