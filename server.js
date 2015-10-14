var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
var vm = require("vm");

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
 

// Quand on client se connecte, on le note dans la console
io.on('connection', function(socket){
  console.log('a user connected');
  
  
  tab=new Array();
  for(var a=0;a<50;a++){
      tab.push([100-(a*7.5), 5]);
      console.log(tab[a]);
  }
  io.emit('snakebegin', tab);
  
  
  function normalize(x1,y1,x2,y2){
    return Math.sqrt((y2-y1)^2+(x2-x1)^2);
  }
  
  function deplacement(pAct,pVis,dist){
    var norm = normalize(pAct[0],pVis[0],pAct[0],pVis[0]);
    
  }
  
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('clickevent',function(point){
    console.log(point);
  });
  io.emit('fram', tab);
  setInterval(function(){
      
    },500);
  
});

