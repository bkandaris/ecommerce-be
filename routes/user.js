const router = require('express').Router();

router.get('/usertest', (req, res) => {
  res.send('The user test is working');
});

module.exports = router;
