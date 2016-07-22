var express = require('express');
var Sequelize = require('sequelize');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

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