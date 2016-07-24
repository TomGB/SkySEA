/**
 * Created by amu35 on 24/07/2016.
 */
var models = require('../db/models/index');
var express = require('express');
var app = express.Router();

app.route('/')
    .get( function (req, res) {
    models.Product.findAll({attributes:['id','name','imageUrl']}).then(function (result) {
        res.json({cases:result});
    });
});

module.exports = app;