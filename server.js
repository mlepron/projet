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

  res.sendfile('public/circle.html');
});



var server = https.createServer(https_options, app).listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


// Chargement de socket.io
var io = require('socket.io').listen(server);
var model = require('./modele');

point = model.Point;
var snake = model.Snake;

var postete = new point(0,0);
var firstdirection = new point(Math.random() *1200, Math.random() * 500); 

tab=new Array();
tab.push(new point(0,0), new point(0,0)  ,new point(0,0) );
var snak = new snake(10,postete,tab);
snak.normalize(firstdirection);

var radius = 30;

postrajetx = [1000];
postrajety = [1000];

var j=0;
var i =0;
increPos = 6;
var corps=0;
var newpointis =false;

// Quand on client se connecte, on le note dans la console
io.on('connection', function(socket){
  console.log('a user connected');
  
  
  

  io.emit('snakebegin', tab);
  
  
 
  
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('clickevent',function(point){
    console.log(point[1]+" ; "+point[2]);
    newx=point[1];
    newy=point[2];
    newpointis=true;
    
  });
  
  setInterval(onFrame,80);
  
  function onFrame(){
    if(newpointis==true){
    
	var newpoint=new point(newx,newy);
	newpointis=false; 
	snak.normalize(newpoint);
    }
    snak.update();
    
    postrajetx.push(snak.postete.x);
    postrajety.push(snak.postete.y);
    
    j=0;
    while(j< snak.tabPosRond.length){
      
      snak.tabPosRond[j].x = postrajetx[i - increPos];
      snak.tabPosRond[j].y = postrajety[i - increPos];
      console.log(snak.tabPosRond[1]);
      increPos += 6;
      j++
    }
    increPos += 6;
    i++;
    

    jsonRes = JSON.stringify({
      'postete': snak.postete,
      'tab': snak.tabPosRond
    });
    
    io.emit('fram', jsonRes  );
    
    
  }
  
});

