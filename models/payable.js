'use strict';
module.exports = (sequelize, DataTypes) => {
    const Payable = sequelize.define('Payable', {
        paymentDate: DataTypes.DATE,
        status: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        transactionId: DataTypes.INTEGER
    }, {});
    Payable.associate = function(models) {
        Payable.belongsTo(models.Transaction, { foreignKey: 'transactionId', as: 'transaction' })
    };
    return Payable;
};
