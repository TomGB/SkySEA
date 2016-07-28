/**
 * Created by amu35 on 24/07/2016.
 */
var models = require('../db/models/index');
var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var sig = "SuperReallySecret";
var cors = require('cors');
app.use(bodyParser({urlencoded: true}));
app.use(cors());

var orderPlaced = '<b>Your order with Sky has been placed successfully and is now being processed</b>';
var orderDispatched = '<b>Your order with Sky has been dispatched and is on its way!</b>' ;


var mailTransporter = nodemailer.createTransport();


app.route('/checkout')
  .post(cors(), function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
          console.log("order ID: ",order.get('id'));
          console.log("product ID: ",products[i].item.id);
          models.ProductOrder.create({
            orderID : order.get('id'),
            productID : products[i].item.id,
            quantity: products[i].quantity
          });
        }

          sendEmail(userID,status);


          res.status(200).send();

          //notify worker of new items for acceptance


          //notify user that order has been placed


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
                    sendEmail(order.userID,status);
                });
              }
            });
          }
        });
      }
    });
  });

  app.route('/getWaitingOrders')
    .post(function(req, res){
      var token = req.body.token;
      // var workerID = jwt.decode(req.body.token, sig);
      var workerID = req.body.token;

      models.Order.findAll({ attributes:['id','userID'], where: {workerID: null} })
      .then(function(order){
        if (order) { // if the record exists in the db
          // console.log("order1",order[0].dataValues);
          var userID = order[0].dataValues.userID;
          models.User.find({attributes:['firstname','lastname', 'address1', 'address2', 'address3', 'postcode'], where: {id: userID}})
          .then(function(user){
            order[0].dataValues.address = user.dataValues
            models.ProductOrder.findAll({where: {orderID: order[0].dataValues.id}, include: [models.Product]})
            .then(function (productOrder) {
              var products = new Array();
              for (var i = 0; i < productOrder.length; i++) {
                products[i] = productOrder[i].dataValues.Product.dataValues;
                products[i].quantity = productOrder[i].dataValues.quantity;
              }
              order[0].dataValues.products = products;
              delete order[0].dataValues.userID;
              console.log(order[0].dataValues);

              var orderArray = new Array();

              orderArray[0] = order[0].dataValues;

              res.setHeader('Access-Control-Allow-Origin', '*');
              res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
              res.json({orders: orderArray});
            });
              // console.log(order[0].dataValues);
          });
        }
      });
    });
module.exports = app;


function sendEmail(userID, reason) {
    models.User.findAll({where: {id: userID}}).then(function (res) {

        var user = res[0].dataValues;

        var mailOptions = {
            from: '"Sky Accessories Store" <alasdair@sky.uk>', // sender address
            html: reason == 'ordered'? orderPlaced: orderDispatched// html body
        };

        mailOptions.to = user.email;
        mailOptions.subject = user.firstName + ', your order has been ' + user.reason == 'ordered'? 'placed': 'dispatched' ;


        // send mail with defined transport object
        mailTransporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }else {
                console.log('Message sent: ' + info);
            }
        });

    })
}