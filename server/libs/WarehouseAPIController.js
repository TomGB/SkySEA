/**
 * Created by amu35 on 24/07/2016.
 */
var models = require('../db/models/index');
var express = require('express');
var app = express.Router();
var jwt = require('jsonwebtoken');
var sig = "SuperReallySecret";

app.route('/checkout')
    .post(function (req,res) {
        var token = req.token;
        var workerID = null;
        var status = "ordered";

        //find available workers
        models.Worker.findAll({
          where: {
            active: true
          }
        })
        .then(function(workers) {
          if(workers.length > 0){
            workerID = workers[0].id;
            status = "allocated, pending accpetance";
          }
          models.Order.create({
            status : status,
            orderDate : new Date().getHours(),
            dispatchDate : null,
            customerID : jwt.decode( token, sig),
            workerID : workerID
          })
          .then(function(order) {
            for (var i = 0; i < req.products.length; i++) {
              for (var j = 0; j < req.products[i].quantity; j++) {
                models.ProductOrders.create({
                  orderID : order.get('id'),
                  productID : req.products[i].id
                });
              }
            }
          },function(err) {
            console.log(err);
          });
        })
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
