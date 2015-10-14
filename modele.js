module.exports.Point=Point;

module.exports.Vector=Vector;


function Point(x,y){
  this.x=x;
  this.y=y;
  
}

function Vector(x,y){
  this.x=x;
  this.y=y;
  
  this.norme=function(){
  
    return Math.sqrt((this.x*this.x)+(this.y*this.y));
  };
}