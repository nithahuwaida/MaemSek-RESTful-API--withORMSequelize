'use-strict';

const express = require('express');
const informationController = require('../controllers/information');
const Router = express.Router();

Router.get('/', informationController.getInformationAll);

module.exports = Router;