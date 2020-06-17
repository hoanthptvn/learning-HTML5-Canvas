var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

context.rect(0, 0, 50, 50);
context.stroke();
context.fillStyle = "blue";

context.strokeStyle = "red";
context.rect(0, 60, 100, 50);
context.stroke();
context.fillStyle = "red";
context.fill();
