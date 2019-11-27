'use-strict';

const express = require('express');
const categoryController = require('../controllers/category');
const Router = express.Router();

Router.get('/', categoryController.getCategoryAll);
Router.get('/:id', categoryController.getCategoryById);
Router.post('/', categoryController.postCategory);
Router.put('/:id', categoryController.updateCategory);
Router.delete('/:id', categoryController.deleteCategory);

module.exports = Router;