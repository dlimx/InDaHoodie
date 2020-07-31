const express = require('express');
const customerService = require('../services/customerService');

const customerRouter = express.Router();

customerRouter.get('/', customerService.getAll);
customerRouter.get('/:id', customerService.getCustomerById);
customerRouter.post('/create', customerService.create);

module.exports = customerRouter;
