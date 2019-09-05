const { Router } = require('express');

const router = Router();

import 'dotenv/config'
import models, { sequelize  } from '../models';

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'Express'
  });
});

router.post('/api/v1/transactions', (req, res) => {
    models
        .Transaction
        .create(req.body)
        .then(function(transaction) {
            res.status(201)
               .json({ data: transaction.dataValues});
        });
});


module.exports = router;
