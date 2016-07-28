var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var models = require('../db/models/index');
var sig = "SuperReallySecret";

var exports = module.exports = {};

exports.authorise = function(req, res, next){
  console.log('Auth attempt: ' + Date.now());
    jwt.verify(req.headers.authorization, sig, function(err, token){
        if(err){
            console.log(err);
            res.status(401).send({
                message: "Unauthorized"
            });
            next();
        } else {
            models.User.findAll({where: {id: parseInt(token)}}).then(function(user){
                req.user = user[0].dataValues;
                next();
            });
        }
    });
}

exports.hasRole = function(role) {
  return function(req, res, next) {
    console.log(next);
    console.log('Auth role attempt: ' + Date.now());
    var user = req.user;
    console.log(user);
    if(user.userRole == role) {
      console.log('User role is ' + role);
      next();
    } else {
      //res.status(401).send({ message: 'Unauthorized'});
    }
  }
}
