var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('jovenes', { title: 'Jóvenes', pretty: true });
});

module.exports = router;
