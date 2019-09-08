const { Router } = require('express');

const router = Router();

import 'dotenv/config'
import models, { sequelize  } from '../models';
import TransactionsController from '../controllers/transactions_controller.js';
import ResponseFormatterHelper from '../helpers/response_formatter_helper.js';
import PayableCreator from '../services/payable-creator.js';

let helper = new ResponseFormatterHelper();
let payableCreator = new PayableCreator();
let transactionsController = new TransactionsController(helper, payableCreator);

router.get('/api/v1/transactions', (req, res) => {
    transactionsController.index(req, res);
});

router.post('/api/v1/transactions', (req, res) => {
    transactionsController.create(req, res);
});

module.exports = router;
