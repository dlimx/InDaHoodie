const express = require('express');
const categoryService = require('../services/categoryService');

const categoryRouter = express.Router();

categoryRouter.get('/', categoryService.getAll);
categoryRouter.get('/:id', categoryService.getCategoryById);
categoryRouter.post('/create', categoryService.create);

module.exports = categoryRouter;
