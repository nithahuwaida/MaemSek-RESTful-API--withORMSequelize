'use-strict';

const express = require('express');
const userController = require('../controllers/user');
const Router = express.Router();

Router.get('/', userController.getUserAll);
Router.get('/:id', userController.getUserById);
Router.put('/:id', userController.updateUser);
Router.delete('/:id', userController.deleteUser);

module.exports = Router;