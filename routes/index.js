const { Router } = require('express');

const router = Router();

import 'dotenv/config'

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'Express'
  });
});

module.exports = router;
