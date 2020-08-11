const express = require('express');
const productService = require('../services/productService');

const productRouter = express.Router();

productRouter.get('/', productService.getAll);
productRouter.get('/:id', productService.getProductById);
productRouter.post('/create', productService.create);
productRouter.put('/update/:id', productService.update);
productRouter.delete('/delete', productService.deleteProduct);

module.exports = productRouter;
