/**
 * Created by amu35 on 24/07/2016.
 */
var models = require('../db/models/index');
var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var sig = "SuperReallySecret";
app.use(bodyParser({urlencoded: true}));


app.route('/checkout').post(function(req, res){
//   models.Order.create({
//     status : req.body.status,
//     orderDate : new Date().getHours(),
//     dispatchDate : null,
//     userId : jwt.decode(req.body.userId, sig),
//     workerID : req.body.workerID
//   }).then(function(order){
//     res.json(order);
//   });
// })
        var token = req.body.token;
        var userID = jwt.decode(req.body.token, sig);
        var products = req.body.products;
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
          console.log("status",status);
          console.log("user ID:", userID);
          console.log("worker ID:", workerID);
          console.log("products ",products);
          models.Order.create({
            status : status,
            orderDate : new Date().getHours(),
            dispatchDate : null,
            userID : userID,
            workerID : workerID
          })
          .then(function(order) {
            for (var i = 0; i < products.length; i++) {
              for (var j = 0; j < products[i].quantity; j++) {
                console.log("order ID: ",order.get('id'));
                console.log("product ID: ",products[i].item.id);
                models.ProductOrder.create({
                  orderID : order.get('id'),
                  productID : products[i].item.id
                });
              }
            }
          },function(err) {
            console.log(err);
              res.header = 404;
          });
        })
    })
    .put(function (req,res) {

    });

module.exports = app;
