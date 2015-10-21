module.exports.Point=Point;

module.exports.Vector=Vector;
module.exports.Snake=Snake;
//https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-vectors/a/vector-motion

function Point(x,y){
  this.x=x;
  this.y=y;
  
  this.distance=function(){
    return Math.sqrt((this.x*this.x)+(this.y*this.y));
  }
}

function Vector(x,y){
  this.x=x;
  this.y=y;
  
  this.norme=function(){
    return Math.sqrt((this.x*this.x)+(this.y*this.y));
  };
  
  this.normalize=function(){
    var m = this.norme();
      if (m > 0) {
	this.div(m);
      }
    };
    
    this.div=function(divis){
      this.x=x/divis;
      this.y=y/divis;
    }
}

function Snake(tailleRond,postete,tabPosRond){
  this.postete=postete;
  this.tailleRond=tailleRond;
  this.tabPosRond=tabPosRond;
  
  this.normalize=function(point){
    var x = (point.x - this.postete.x);
    var y =(point.y - this.postete.y);
    var norme = Math.sqrt((x*x)+(y*y));
    this.nextpointX = x/norme*5;
    this.nextpointY = y/norme*5;
    
  }
  
  this.update=function(){
    this.postete.x += this.nextpointX;
    this.postete.y += this.nextpointY;
  }
}