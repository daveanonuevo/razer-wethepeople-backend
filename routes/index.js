const express = require('express');

const router = express.Router();

const moneyRouter = require('./money');

router.use('/money', moneyRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("/ endpoint");
});

module.exports = router;
