const express = require('express');

const router = express.Router();

const moneyRouter = require('./money');
const foodRouter = require('./food');
const servicesRouter = require('./services');
const trasnportRouter = require('/transport');

router.use('/money', moneyRouter);
router.use('/food', foodRouter);
router.use('/services', servicesRouter);
router.use('/transport', trasnportRouter);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("/ endpoint");
});

module.exports = router;
