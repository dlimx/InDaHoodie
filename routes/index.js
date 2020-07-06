const express = require('express');

const router = express.Router();

/* GET api index page. */
router.get('/', function(req, res, next) {
  res.send('hello world');
});

module.exports = router;
