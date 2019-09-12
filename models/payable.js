'use strict';
module.exports = (sequelize, DataTypes) => {
    const Payable = sequelize.define('Payable', {
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
                notEmpty: true,
                notNull: true
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            },
        },
        amount: {
            type: DataTypes.NUMERIC(6,2),
            allowNull: false,
            validate: {
                isFloat: true,
                notEmpty: true,
                notNull: true
            },
        },
        transactionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                notEmpty: true,
                notNull: true
            },
        }
    }, {});
    Payable.associate = function(models) {
        Payable.belongsTo(models.Transaction, { foreignKey: 'transactionId', as: 'transaction' })
    };
    return Payable;
};
