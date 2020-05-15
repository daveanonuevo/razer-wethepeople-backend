const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev')); //Logs Requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
