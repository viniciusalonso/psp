'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentDate: {
          type: Sequelize.DATE,
          allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('paid', 'waiting_funds', 'available'),
        allowNull: false,
      },
      amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
      },
      transactionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Transactions',
              key: 'id'
          }
      },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Payables');
    }
};
