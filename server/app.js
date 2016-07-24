var express = require('express');
var Sequelize = require('sequelize');
var app = express();
var models = require('./db/models/index');
var passport = require('passport');
var port = process.env.PORT || 3000;
var sequelize = new Sequelize('mysql://root:@localhost:3000/seanDB');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.listen(port, function() {
  console.log('App listening on port: ' + port);
});

app.get('/api/cases', function (req, res) {
    res.json({cases:[
        {name:'starwars'},
        {name: 'frozen'},
        {name: 'silicon valley'}
    ]});
});

app.get('/api/users', function(req, res){
  models.User.findAll({}).then(function(users){
    res.json(users);
  })
})
