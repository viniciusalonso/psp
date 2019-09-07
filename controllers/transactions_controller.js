import models, { sequelize  } from '../models';
import pry from 'pryjs'

class TransactionsController {

    constructor(helper) {
        this.helper = helper;
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
                return this.helper.formatCreatedResponse(response, transaction.dataValues);
            }).catch((sequelizeValidationError) => {
                return this.helper.formatErrorsResponse(response, sequelizeValidationError);
            });
    }
}

export default TransactionsController;
