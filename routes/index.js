const express = require('express');

const router = express.Router();

/* GET api index page. */
// TODO - drop star
router.get('*', (req, res, next) => {
  res.send('hello world');
});
/* POST api index */
// TODO - drop star
router.post('*', (req, res, next) => {
  res.send({ name: 'hello world' });
});

module.exports = router;
