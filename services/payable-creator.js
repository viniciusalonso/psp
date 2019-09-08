import DebitCardPayableCreator from './debit-card/debit-card-payable-creator.js';
import CreditCardPayableCreator from './credit-card/credit-card-payable-creator.js';

import models from '../models';

class PayableCreator {

    create(transaction) {
        if (transaction.paymentMethod == 'debit_card') {
            let debitCard = new DebitCardPayableCreator();
            let payableDataToCreate = debitCard.payableDataToCreate(transaction);

            models.Payable.create(payableDataToCreate);
        }
        else {
            let creditCard = new CreditCardPayableCreator();
            let payableDataToCreate = creditCard.payableDataToCreate(transaction);

            models.Payable.create(payableDataToCreate);
        }

    }
}

export default PayableCreator;
