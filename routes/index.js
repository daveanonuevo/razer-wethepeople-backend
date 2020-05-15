const express = require('express');

const router = express.Router();

const moneyRouter = require('./money');
const activitiesRouter=require('./activities');

router.use('/money', moneyRouter);
router.use('/activities',activitiesRouter);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("/ endpoint");
});

module.exports = router;
