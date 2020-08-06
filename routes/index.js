const express = require('express');
const customerRouter = require('./customerRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const designerRouter = require('./designerRouter');

const router = express.Router();

router.use('/customer', customerRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use('/designer', designerRouter);

module.exports = router;
