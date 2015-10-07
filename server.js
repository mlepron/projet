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

  res.sendfile('public/circle2.html');
});



var server = https.createServer(https_options, app).listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


// Chargement de socket.io
var io = require('socket.io').listen(server);


tab=new Array(); 

// Quand on client se connecte, on le note dans la console
io.on('connection', function(socket){
  console.log('a user connected');
  
  for(var a=0;a<50;a++){
      tab.push([100-(a*7.5), 5]);
      console.log(tab[a]);
  }
  
  
  
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('clickevent',function(point){
    console.log(point);
  });
  
  setInterval(function(){
      
    
    
    
    
    
    
    
    io.emit('fram', tab);
    },500);
  
});

