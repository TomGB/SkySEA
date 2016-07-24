var express = require('express');
var Sequelize = require('sequelize');
var app = express();
var models = require('./db/models/index');
var passport = require('passport');
var port = process.env.PORT || 3000;
var sequelize = new Sequelize('mysql://root:@localhost/seanDB');
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
var bcrypt = require('bcrypt-nodejs');
app.listen(port, function() {
    console.log('App listening on port: ' + port);
});
app.use(bodyParser({urlencoded: true}));

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

app.get('/api/dashboard', function(req, res, next){
    if(!req.isAuthenticated()){
        res.redirect('/api/login')
    }else{
        var user = req.user;
        if(user !== undefined){
            user = user.toJSON();
        }
        res.json({user: user});
    }
});

app.get('/api/login', function(req, res, next){
    if(req.isAuthenticated()) res.redirect('/api/dashboard');
    res.redirect('/api/login');
});

app.post('/api/login', function(req, res, next){
    models.User.findAll({where: {email: req.body.email}}).then(function(user){
        if(user !== null){
            if(bcrypt.compareSync(req.body.password, user[0].password)){
                res.redirect('/api/dashboard')
            }else{
                res.redirect('/api/login');
            }
        }
    });
});

app.get('/api/sign-up', function(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/api/dashboard')
    }else{
        res.redirect('/api/sign-up');
    }
});

app.post('/api/sign-up', function(req, res, next){
    models.User.create({
        email: req.body.email,
        password: models.User.generateHash(req.body.password)
    }).then(function(user){
        return res.json(user);
    }).catch(Sequelize.ValidationError, function(err){
        return res.status(422).send(err.errors);
    }).catch(function(err){
        return res.status(400).send({
            message: err.message
        });
    });
});