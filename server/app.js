var express = require('express');
var Sequelize = require('sequelize');
var app = express();
var passport = require('passport');
var port = process.env.PORT || 3000;
var sequelize = new Sequelize('mysql://root:@localhost/seanDB');
var https = require('https');
var fs = require('fs');



app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('App listening on port: ' + port);
});

var options = {
  key: fs.readFileSync('./ssl/69546497-localhost_3000.key'),
  cert: fs.readFileSync('./ssl/69546497-localhost_3000.cert'),
  requestCert: false,
  rejectUnauthorized: false
};

// var server = https.createServer(options, app).listen(port, function(){
//   console.log("server started at port 3000");
// });

app.use('/api',require('./libs/APIrouter'));

