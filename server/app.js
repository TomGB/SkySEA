var express = require('express');
var Sequelize = require('sequelize');
var models = require('./db/models');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('App listening on port: ' + port);
});

var sequelize = new Sequelize('mysql://root:@localhost/seanDB');

sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });

app.use('/api',require('./libs/APIrouter'));
