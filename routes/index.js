const express = require('express');

const router = express.Router();

const moneyRouter = require('./money');
const servicesRouter=require('./services');

router.use('/money', moneyRouter);
router.use('/services',servicesRouter);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("/ endpoint");
});

module.exports = router;
