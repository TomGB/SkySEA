var express = require('express');
var helpchat = require('./helpchat.js');
var auth = require('../auth.js');
var bodyParser = require('body-parser');
var router = express.Router();

router.use([auth.authorise, auth.hasRole('tech_support')]);

router.get('/', function(req, res) {
  console.log('tech assistant page');
});

router.get('/nextCustomer', function(req, res) {
  res.json({
    user: {
      firstName: req.user.firstName,
      lastName: req.user.lastName
    },
    customer: helpchat.getNextCustomer()
  });
});

module.exports = router;
