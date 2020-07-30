const express = require('express');
const customerRouter = require('./customerRouter');

const router = express.Router();

router.use('/customer', customerRouter);

module.exports = router;
