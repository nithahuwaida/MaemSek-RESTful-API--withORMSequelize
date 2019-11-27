'use-strict';

const express = require('express');
const Router = express.Router();

const user = require('./user');
// const product = require('./product');
// const category = require('./category');
// const transaction= require('./transaction');
const userController = require('../controllers/user');

Router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Backend Application Point Of Sale MAEMSEK "
  });
})
.post('/register', userController.registerUser)
.post('/login', userController.loginUser);

Router.use('/users',user);
// Router.use('/products',product);
// Router.use('/categories',category);
// Router.use('/transactions',transaction);


module.exports = Router;