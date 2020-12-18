var express = require('express');
var router = express.Router();

router.post('/place', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/places', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/review/:placeId', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:searchTerm/:location', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
