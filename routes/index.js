const { Router } = require('express');

const router = Router();

import 'dotenv/config'
import models, { sequelize  } from '../models';
import TransactionsController from '../controllers/transactions_controller.js';
import ResponseFormatterHelper from '../helpers/response_formatter_helper.js';

let helper = new ResponseFormatterHelper();
let transactionsController = new TransactionsController(helper);

router.get('/api/v1/transactions', (req, res) => {
    transactionsController.index(req, res);
});

router.post('/api/v1/transactions', (req, res) => {
    transactionsController.create(req, res);
});

module.exports = router;
