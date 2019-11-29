'use-strict';

const express = require('express');
const Router = express.Router();

const user = require('./user');
const product = require('./product');
const category = require('./category');
const transaction= require('./transaction');
const userController = require('../controllers/user');
const { validateUser } = require('../middleware/validateToken');

Router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Backend Application Point Of Sale MAEMSEK "
  });
})
.post('/register', userController.registerUser)
.post('/login', userController.loginUser);

Router.use('/users',validateUser, user);
Router.use('/products',validateUser, product);
Router.use('/categories',validateUser, category);
Router.use('/transactions',validateUser,transaction);


module.exports = Router;