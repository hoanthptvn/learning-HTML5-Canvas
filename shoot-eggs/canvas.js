var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

context.moveTo(0, 0);
context.lineTo(100, 0);
context.lineTo(100, 50);
context.lineTo(0, 50);
context.lineTo(0, 0);
context.stroke();
