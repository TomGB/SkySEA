/**
 * Created by amu35 on 24/07/2016.
 */
var models = require('../db/models/index');
var express = require('express');
var app = express.Router();
var sig = "SuperReallySecret";

app.route('/checkout')
    .post(function (req,res) {
        var name = req.body.name;
        var token = req.body.token;

        models.Order.create({
          status : "ordered",
          orderDate : new Date().getHours(),
          dispatchDate : null,
          customerID : jwt.decode( token, sig),
          workerID : null
        })
        .then(function(order) {
          for (var i = 0; i < req.body.products.length; i++) {
            models.ProductOrders.create({
              orderID : order.get('id'),
              productID : req.body.products[i].id
            });
          }
        },function(err) {
          console.log(err);
        });
    })
    .put(function (req,res) {

    });

// app.route('/testProd')
//   .get(function (req,res) {
//
//     models.Product.create({
//       name : ""
//     })
//     .then(function(productType) {
//       console.log(productType.id, productType.name);
//     },function(err){
//       console.log(err);
//     });
//     //
//     // models.Product.create({
//     //   name : "test name",
//     //   price : 45,
//     //   productType: 1
//     // })
//     // .then(function(err, product) {
//     //   console.log(product.get("id"));
//     // });
//   });

module.exports = app;
