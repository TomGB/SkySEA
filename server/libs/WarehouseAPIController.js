/**
 * Created by amu35 on 24/07/2016.
 */
var client = require('twilio')('ACddbb2fa5534a75f1f06eae816381e42e', '847d60b350ffb04f698a2c41f2d6cc76');
var nodemailer = require('nodemailer');
var mailTransporter = nodemailer.createTransport();
var models = require('../db/models/index');
var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var sig = "SuperReallySecret";
var cors = require('cors');
app.use(bodyParser({urlencoded: true}));
app.use(cors());

app.route('/checkout')
  .post(cors(), function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var token = req.body.token;
    var userID = jwt.decode(token, sig);
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

        client.sendMessage({
          to:'+447850572348',
          from: '+441722580073',
          body: 'Your order is currently being processed.'
        }, function(err, responseData) {
          if (!err) { // "err" is an error received during the request, if any

             // "responseData" is a JavaScript object containing data received from Twilio.
             // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
             // http://www.twilio.com/docs/api/rest/sending-sms#example-1

             console.log(responseData.from); // outputs "+14506667788"
             console.log(responseData.body); // outputs "word to your mother."

           }
        });


        sendEmail(userID,'ordered');
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
    var workerID = jwt.decode(token, sig);
    // var workerID = req.body.token;
    var orderIDArray = req.body.orderArray;
    for (var i = 0; i < orderArray.length; i++) {
      models.Order.find({ where: {id: orderArray[i].id, workerID: workerID} }).on('success',function(order){
        if (order) { // if the record exists in the db
          order.updateAttributes({
            status : "processing"
          }).then(function() {
            res.status(200).send();
          },function(err) {
            res.status(500).send();
          });
        }
      });
    }
    models.Worker.find({ where: {id: workerID} })
    .then(function(worker){
      if (worker) { // if the record exists in the db
        worker.updateAttributes({
          active : false
        }).then(function(worker) {

          res.setHeader('Access-Control-Allow-Origin', '*');
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.status(200).send();

        },function(err) {
          res.status(500).send();
        });
      }
    });
  });




app.route('/rejectOrder')
  .post(function(req, res){
    var token = req.body.token;
    var workerID = jwt.decode(token, sig);
    // var workerID = req.body.token;
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
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.status(200).send();

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
    var workerID = jwt.decode(token, sig);
    // var workerID = req.body.token;
    var orderIDArray = req.body.orderArray;

    models.Worker.find({ where: {id: workerID} })
    .then(function(worker){
      if (worker) { // if the record exists in the db
        worker.updateAttributes({
          active : false
        }).then(function() {
          var status = "dispatched";


          for (var i = 0; i < orderIDArray.length; i++) {
            models.Order.find({ where: {id: orderIDArray[i]} })
            .then(function(order){
              if (order) { // if the record exists in the db
                order.updateAttributes({
                  status : status
                }).then(function() {


                  sendEmail(userID,'dispatched');
                  // notify user that order has been dispatched
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                  res.status(200).send();

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
      var workerID = jwt.decode(token, sig);
      // var workerID = req.body.token;

      models.Order.findAll({ attributes:['id','userID'], where: {$or: [{workerID: null}, {workerID: workerID}]} })
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

    app.route('/setActive')
      .post(function(req, res){

        var status = req.body.status;
        var token = req.body.token;
        var workerID = jwt.decode(token, sig);
        // var workerID = req.body.token;

        models.Worker.find({ where: {id: workerID} })
        .then(function(worker){
          if (worker) { // if the record exists in the db
            worker.updateAttributes({
              active : status
            }).then(function() {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
              res.status(200).send();
            });
          }
        });
      });
module.exports = app;


function sendEmail(userID, reason) {
    models.User.findAll({where: {id: userID}}).then(function (res) {

        var user = res[0].dataValues;

        var orderPlaced = 'Your order with Sky has been placed successfully and is now being processed.';
        var orderDispatched = 'Your order with Sky has been dispatched successfully and is now being delivered.';

        var mailOptions = {
            from: '"Sky Accessories Store" <alasdair@sky.uk>', // sender address
            html: reason == 'ordered'? orderPlaced : orderDispatched// html body
        };

        mailOptions.to = user.email;
        mailOptions.subject = user.firstName + ', your order has been ' + reason == 'ordered'? "received" : "dispatched" ;


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
