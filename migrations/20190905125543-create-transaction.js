'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            amount: {
                type: Sequelize.FLOAT
            },

            description: {
                type: Sequelize.STRING
            },

            paymentMethod: {
                type: Sequelize.ENUM('debit_card', 'credit_card')
            },

            cardNumber: {
                type: Sequelize.STRING(20)
            },

            cardholderName: {
                type: Sequelize.STRING
            },

            expirationDate: {
                type: Sequelize.STRING(4)
            },

            cvv: {
                type: Sequelize.STRING(3)
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
        return queryInterface.dropTable('Transactions');
    }
};
