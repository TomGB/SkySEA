var express = require('express');
var Sequelize = require('sequelize');
var models = require('./db/models');
var app = express();
var models = require('./db/models/index');
var passport = require('passport');
var port = process.env.PORT || 3000;
var sequelize = new Sequelize('mysql://root:@localhost:3000/seanDB');

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

app.get('/api/cases', function (req, res) {
    models.Product.findAll({attributes:['id','name','imageUrl']}).then(function (result) {
        res.json({cases:result});
    });
});

app.get('/api/users', function(req, res){
  models.User.findAll({}).then(function(users){
    res.json(users);
  })
});
