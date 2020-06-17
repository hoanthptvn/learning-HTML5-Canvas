document.addEventListener("DOMContentLoaded", function (e) {
  var canvas = document.getElementById("field");

  var c = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var imgTree = new Image();
  imgTree.src = "tree.png";
  var imgLight = new Image();
  imgLight.src = "light.png";

  var x = 100;
  var y = 100;

  function Snow() {
    this.x = Math.round(Math.random() * canvas.width);
    this.y = Math.round(Math.random() * canvas.height);
    this.radius = Math.round(Math.random() * 5 + 1);
    this.a = Math.random() * 5;
  }

  Snow.prototype.update = function () {
    c.beginPath();
    c.fillStyle = "#ffffff";
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();

    this.x += Math.sin(this.a);
    this.a += 0.01;

    if (this.x > canvas.width || this.x < 0) {
      this.x = Math.round(Math.random() * canvas.width);
      this.y = 0;
    }

    this.y += 2;
    if (this.y > canvas.height) {
      this.y = 0;
    }
  };
  var totalSnows = 150;
  var snows = [];

  function drawSnows() {
    snows.forEach((snow) => {
      snow.update();
    });
  }

  function drawTextures() {
    c.drawImage(imgTree, 0, 240, 450, 500);
    c.drawImage(imgLight, 200, 0, 900, 300);
    c.fillStyle = "#ffffff";
    c.font = "48px Helvetica, san-serif";
    c.fillText("MERRY CHRISTMAS", 500, 400);
    c.fillText("wish you all a Merry Christmas!", 400, 500);
  }

  function marryXmas() {
    window.requestAnimationFrame(marryXmas);
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawTextures();
    drawSnows();
  }

  window.onload = function () {
    for (var i = 0; i < totalSnows; i++) {
      snows.push(new Snow());
    }
    marryXmas();
  };
});
