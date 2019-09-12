const { Router } = require('express');

const router = Router();

import 'dotenv/config'

import { BalanceController, TransactionsController  } from '../controllers';
import { ResponseFormatterHelper } from '../helpers/';
import { BalanceService, PayableCreator } from '../services';

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
