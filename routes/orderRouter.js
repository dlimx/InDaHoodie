const express = require('express');
const orderService = require('../services/orderService');

const orderRouter = express.Router();

orderRouter.get('/', orderService.getAll);
orderRouter.get('/:id', orderService.getOrderById);
orderRouter.post('/create', orderService.create);

module.exports = orderRouter;
