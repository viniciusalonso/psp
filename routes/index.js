const { Router } = require('express');

const router = Router();

import 'dotenv/config'
import models, { sequelize  } from '../models';
import TransactionsController from '../controllers/transactions-controller.js';
import BalanceController from '../controllers/balance-controller.js';
import ResponseFormatterHelper from '../helpers/response-formatter-helper.js';
import PayableCreator from '../services/payable-creator.js';
import BalanceService from '../services/balance-service.js';

let helper = new ResponseFormatterHelper();
let payableCreator = new PayableCreator();
let transactionsController = new TransactionsController(helper, payableCreator);

let balanceService = new BalanceService();
let balanceController = new BalanceController(helper, balanceService);

router.get('/api/v1/transactions', (req, res) => {
    transactionsController.index(req, res);
});

router.post('/api/v1/transactions', (req, res) => {
    transactionsController.create(req, res);
});

router.get('/api/v1/balance', (req, res) => {
    balanceController.index(req, res);
});


module.exports = router;
