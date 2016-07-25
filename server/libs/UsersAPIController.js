/**
 * Created by amu35 on 24/07/2016.
 */
var express = require("express");
var app = express.Router();
var models = require('../db/models/index');

app.route('/')
    .get( function(req, res) {
    models.User.findAll({}).then(function (users) {
        res.json(users);
    })
});

module.exports = app;