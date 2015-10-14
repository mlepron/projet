var modele = require("./modele");
var point = modele.Point;
var vector = modele.Vector;

var v = new vector(3,4);
console.log(v);

if(v.norme()!==5){

  console.error("attendu 5 recu "+v.norme());
}