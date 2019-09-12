'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        amount: {
            type: DataTypes.NUMERIC(6,2),
            allowNull: false,
            validate: {
                isFloat: true,
                notEmpty: true,
                notNull: true
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        paymentMethod: {
            type:  DataTypes.ENUM('debit_card', 'credit_card'),
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [['debit_card', 'credit_card']],
                notNull: true
            }
        },
        cardNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true,
                isInt: true,
            },
            set(value) {
                let lastIndex = value.length;
                let cardLastFourNumbers = value.slice(lastIndex - 4, lastIndex);
                this.setDataValue('cardNumber', cardLastFourNumbers);
            }
        },
        cardholderName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },
        expirationDate: {
            type: DataTypes.STRING(4),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [4],
                isInt: true,
                notNull: true
            }
        },
        cvv: {
            type: DataTypes.STRING(3),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3],
                isInt: true,
                notNull: true
            }
        },
    }, {});
    Transaction.associate = function(models) {
        Transaction.hasOne(models.Payable, { foreignKey: 'transactionId', as: 'payable' })
    };
    return Transaction;
};

