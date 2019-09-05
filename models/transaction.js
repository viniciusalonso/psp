'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
      amount: DataTypes.FLOAT,
      description: DataTypes.STRING,
      paymentMethod: DataTypes.ENUM('debit_card', 'credit_card'),
      cardNumber: DataTypes.STRING(20),
      cardholderName: DataTypes.STRING,
      expirationDate: DataTypes.STRING(4),
      cvv: DataTypes.STRING(3)
  }, {});
  Transaction.associate = function(models) {
  };
  return Transaction;
};
