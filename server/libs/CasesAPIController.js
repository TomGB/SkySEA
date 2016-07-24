/**
 * Created by amu35 on 24/07/2016.
 */
var models = require('../db/models/index');
var express = require('express');
var app = express.Router();

app.route('/')
    .get( function (req, res) {
        models.Product.findAll({attributes:['id','name','imageUrl', 'availableStock', 'price']})
            .then(function (result) {
                    res.json({cases:result});
            })
    })
    .post(function (req,res) {
        
    })
    .put(function (req,res) {
        
    });
app.route('/:prodId').get(function (req,res) {
    var productId = req.params.prodId;

    models.Product.findOne({attributes:['id','name','imageUrl', 'availableStock', 'price','description'],where:{id: productId}}).then(function(product) {
        res.json(product);
    })
});

module.exports = app;