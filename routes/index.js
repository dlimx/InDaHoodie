const express = require('express');
const customerRouter = require('./customerRouter');
const productRouter = require('./productRouter');

const router = express.Router();

router.use('/customer', customerRouter);
router.use('/product', productRouter);

module.exports = router;
