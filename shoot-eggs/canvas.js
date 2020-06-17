var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

context.arc(100, 100, 50, 0, Math.PI / 2, false);
context.stroke();
context.fill();
