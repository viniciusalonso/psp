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

    async create(request, response) {
        try {
            const transaction = await models.Transaction.create(request.body);
            const payable = await this.payableCreator.create(transaction);
            return await this.helper.formatCreatedResponse(response, transaction.dataValues);
        } catch (e) {
            return this.helper.formatErrorsResponse(response, e);
        }
    }
}

export default TransactionsController;
