var helpchat = require('./helpchat.js');
var express = require('express');
var router = express.Router();

router.post('/clientid', function(req, res) {
  var clientid = req.body.clientid;
  console.log('Client ' + clientid + ' needs assistance');
  helpchat.addCustomerToQueue({firstName: req.body.name, peerjsId: req.body.clientid});
  console.log(helpchat.getCustomerQueue());
});

module.exports = router;
