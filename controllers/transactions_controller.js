import models, { sequelize  } from '../models';
import pry from 'pryjs'

class TransactionsController {

    constructor(helper) {
        this.helper = helper;
    }

    create(request, response) {
        return models.Transaction.create(request.body)
            .then((transaction) => {
                return this.helper.formatCreatedResponse(response, transaction);
            }).catch((sequelizeValidationError) => {
                return this.helper.formatErrorsResponse(response, sequelizeValidationError);
            });
    }
}

export default TransactionsController;
