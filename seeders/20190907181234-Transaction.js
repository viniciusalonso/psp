'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Transaction', [{
        amount: 12.50,
        description: 'My product',
        paymentMethod: 'credit_card',
        cardNumber: '4012001037141112',
        cardholderName: 'João Alberto',
        expirationDate: '1222',
        cvv: '123'
      }, {
        amount: 23.50,
        description: 'My product 2',
        paymentMethod: 'debit_card',
        cardNumber: '6370950000000005',
        cardholderName: 'Ana Júlia',
        expirationDate: '1222',
        cvv: '123'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Transaction', null, {});
  }
};
