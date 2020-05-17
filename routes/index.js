const express = require('express');

const router = express.Router();

const fs = require('fs');
const path = require('path');

const moneyRouter = require('./money');
const foodRouter = require('./food');
const servicesRouter = require('./services');
const trasnportRouter = require('./transport');

require('dotenv').config();

router.use('/money', moneyRouter);
router.use('/food', foodRouter);
router.use('/services', servicesRouter);
router.use('/transport', trasnportRouter);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("/ endpoint");
});

router.post('/', (req, res, next) => {
  const api = require('../foreign_exchange_rates_api').foreign_exchange_rates_api;
  const authCredentials = require('../credentials.json');

  const foreign_exchange_rates_api = new api(authCredentials);

  const destinationCurrency = (req.body.destination === 'SGD')? '702' :'458';

  const sourceCurrency = (req.body.source === 'SGD')? '702' :'458';

  foreign_exchange_rates_api.foreignexchangelookup(getParameters()).then(function (result) {
    console.log(result.response.body);
    res.send(result.response.body);
  })
      .catch(function (error) {

        res.send(error.body);
      });

  function getParameters() {
    var parameters = {
      "x-client-transaction-id": "{enter appropriate value}",
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    parameters.payload = {
      "sourceCurrencyCode": `${sourceCurrency}`,
      "sourceAmount": `${req.body.amountinmyr}`,
      "destinationCurrencyCode": `${destinationCurrency}`,
      "markUpRate": "1"
    };
    return parameters;
  }
  const username = process.env.VISA_USERNAME;
  const password = process.env.VISA_PASSWORD;
  const auth = Buffer.from(username + ':' + password).toString('base64');
  const key = fs.readFileSync(path.join(__dirname, '../assets/key.pem'));
  const cert = fs.readFileSync(path.join(__dirname, '../assets/cert.pem'));
  const ca = fs.readFileSync(path.join(__dirname ,'../assets/ca.crt'));


  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

});

module.exports = router;
