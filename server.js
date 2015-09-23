var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();

var key = fs.readFileSync('./key.pem', 'utf8');
var cert = fs.readFileSync('./server.crt', 'utf8');

var https_options = {
	key: key,
	cert: cert
};

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});
app.get('/circle',function (req, res) {

  res.sendfile('public/circle.html');
});



var server = https.createServer(https_options, app).listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

