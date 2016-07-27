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


app.route('/checkout')
  .post(function(req, res){
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
        res.status(200).send();

          //notify worker of new items for acceptance

      },function(err) {
        res.status(500).send({
            message: "Something went wrong with processing your order. Please try again."
        });
      });
    })
  });



app.route('/acceptOrder')
  .post(function(req, res){
    var token = req.body.token;
    // var workerID = jwt.decode(req.body.token, sig);
    var workerID = req.body.token;
    var orderIDArray = req.body.orderArray;
    for (var i = 0; i < orderArray.length; i++) {
      models.Order.find({ where: {id: orderArray[i].id, workerID: workerID} }).on('success',function(order){
        if (order) { // if the record exists in the db
          order.updateAttributes({
            status : "processing"
          }).success(function() {});
        }
      });
    }
    models.Worker.find({ where: {id: workerID} })
    .then(function(worker){
      if (worker) { // if the record exists in the db
        worker.updateAttributes({
          active : false
        }).then(function(worker) {
        });
      }
    });
  });




app.route('/rejectOrder')
  .post(function(req, res){
    var token = req.body.token;
    // var workerID = jwt.decode(req.body.token, sig);
    var workerID = req.body.token;
    var orderIDArray = req.body.orderArray;

    models.Worker.find({ where: {id: workerID} })
    .then(function(worker){
      if (worker) { // if the record exists in the db
        worker.updateAttributes({
          active : false
        }).then(function() {
          models.Worker.findAll({
            where: {
              active: true
            }
          }).then(function(workers) {
            var status = "ordered";
            var workerID = null;
            if(workers.length > 0){
              workerID = workers[0].id;
              status = "allocated, pending accpetance";
            }
            for (var i = 0; i < orderArray.length; i++) {
              models.Order.find({ where: {id: orderArray[i]} })
              .then(function(order){
                if (order) { // if the record exists in the db
                  order.updateAttributes({
                    status : status,
                    workerID : workerID
                  }).then(function() {

                    // notify worker of new order ready

                  });
                }
              });
            }
          });
        });
      }
    });
  });
app.route('/dispatchOrder')
  .post(function(req, res){
    var token = req.body.token;
    // var workerID = jwt.decode(req.body.token, sig);
    var workerID = req.body.token;
    var orderIDArray = req.body.orderArray;

    models.Worker.find({ where: {id: workerID} })
    .then(function(worker){
      if (worker) { // if the record exists in the db
        worker.updateAttributes({
          active : false
        }).then(function() {
          var status = "dispatched";


          for (var i = 0; i < orderArray.length; i++) {
            models.Order.find({ where: {id: orderArray[i]} })
            .then(function(order){
              if (order) { // if the record exists in the db
                order.updateAttributes({
                  status : status
                }).then(function() {

                  // notify user that order has been dispatched

                });
              }
            });
          }
        });
      }
    });
  });
  
module.exports = app;
