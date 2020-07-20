const express = require('express');

const router = express.Router();

/* GET api index page. */
// TODO - drop star
router.get('*', function (req, res, next) {
  res.send('hello world');
});

module.exports = router;
