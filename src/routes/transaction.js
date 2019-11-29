'use-strict';

const express = require('express');
const transactionController = require('../controllers/transaction');
const Router = express.Router();

Router.get('/', transactionController.getTransactionAll);
Router.get('/:id', transactionController.getTransactionById);
Router.post('/', transactionController.postTransaction);

module.exports = Router;