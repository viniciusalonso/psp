import { DebitCardRules, CreditCardRules } from './card-rules';
import models from '../models';

class PayableCreator {

    create(transaction) {
        let rules = null;

        if (transaction.paymentMethod == 'debit_card') {
            rules = new DebitCardRules(transaction);
        }
        else {
            rules = new CreditCardRules(transaction);
        }

        let payableData = {
            'transactionId': transaction.id,
            'status': rules.getStatus(),
            'paymentDate': rules.getPaymentDate(),
            'amount': rules.discountFee()
        };

        return models.Payable.create(payableData);
    }
}

export default PayableCreator;
