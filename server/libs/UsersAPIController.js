/**
 * Created by amu35 on 24/07/2016.
 */
var express = require("express");
var app = express.Router();
var models = require('../db/models/index');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');
var sig = "SuperReallySecret";
app.use(bodyParser({urlencoded: true}));

app.route('/register').post(function(req, res){
    models.User.create({
        email: req.body.email,
        password: models.User.generateHash(req.body.password),
        address1: req.body.address1,
        address2: req.body.address2,
        address3: req.body.address3,
        postcode: req.body.postcode,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(function(user){
        var token = jwt.sign(user.id, sig);
        return res.json({user: user, token: token, headers:{authorization: token } });
    }).catch(Sequelize.ValidationError, function(err){
        return res.status(422).send(err.errors);
    }).catch(function(err){
        return res.status(400).send({
            message: err.message
        });
    });
});

function middle(req, res){
    jwt.verify(req.headers.authorization, sig, function(err, token){
        if(err){
            res.status(401).send({
                message: "Unauthorized"
            })
        }else{
            models.User.findAll({where: {id: parseInt(token)}}).then(function(user){
                res.json({user: user[0], access: true});
            });
        }
    });
}

app.route('/login').get(middle).post(function(req, res){
    models.User.findAll({where: {email: req.body.email}}).then(function(user, err){
        if(user != undefined){
            try{
                if(bcrypt.compareSync(req.body.password, user[0].password)){
                    var token = jwt.sign(user[0].id, sig);
                    res.json({token: token, headers:{authorization: token } });
                }
            }catch(user){
                res.status(401).send({
                    message: "Whoops! Password incorrect"
                })
            }
        }
    });
});


module.exports = app;