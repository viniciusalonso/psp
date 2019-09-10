import models, { sequelize  } from '../models';
import pry from 'pryjs'

class TransactionsController {

    constructor(helper, payableCreator) {
        this.helper = helper;
        this.payableCreator = payableCreator;
    }

    index(request, response) {
        return models.Transaction.findAll({
            attributes: ['amount', 'description', 'paymentMethod', 'cardNumber', 'cardholderName']
        }).then((transactions) => {
            return this.helper.formatSuccessResponse(response, transactions);
        });
    }

    create(request, response) {
        return models.Transaction.create(request.body)
            .then((transaction) => {
                this.payableCreator.create(transaction);
                return this.helper.formatCreatedResponse(response, transaction.dataValues);
            }).catch((sequelizeValidationError) => {
                return this.helper.formatErrorsResponse(response, sequelizeValidationError);
            });
    }
}

export default TransactionsController;
