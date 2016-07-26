var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var helpchat = require('./libs/helpchat.js');
var app = express();
var passport = require('passport');
var port = process.env.PORT || 3000;
var sequelize = new Sequelize('mysql://root:@localhost/seanDB');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function isAuthenticated() {
  console.log('Sup');
  return true;
}

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use('/techAssistant', express.static(__dirname + '/techAssistant'));

app.post('/helpchat/clientid', function(req, res) {
  var clientid = req.body.clientid;
  helpchat.addCustomerToQueue({firstName: req.body.name, lastName: req.body.lastName, peerjsId: req.body.clientid});
});


app.use('/', function(){ console.log('derp')});
app.listen(port, function() {
  console.log('App listening on port: ' + port);
});


var sequelize = new Sequelize('mysql://root:@localhost:3000/seanDB');

sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });

app.use('/api',require('./libs/APIrouter'));
