var express = require('express');
var Sequelize = require('sequelize');
var app = express();
var passport = require('passport');
var port = process.env.PORT || 3000;
var sequelize = new Sequelize('mysql://root:@localhost/seanDB');

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('App listening on port: ' + port);
});

sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });

app.use('/api',require('./libs/APIrouter'));