document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.querySelector("canvas");
  var c = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var mouse = {
    x: null,
    y: null,
  };

  const maxRadius = 50;
  const minRadius = 5;

  const arrayColor = [
    "#1abc9c",
    "#2ecc71",
    "#f1c40f",
    "#e74c3c",
    "#bdc3c7",
    "#2c3e50",
  ];

  document.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();
  });

  document.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  function createX() {
    return Math.floor(Math.random() * canvas.width);
  }

  function createY() {
    return Math.floor(Math.random() * canvas.height);
  }

  function randomColor() {
    return arrayColor[Math.floor(Math.random() * arrayColor.length)];
  }

  function Circle(x, y, radius, color) {
    this.x = x; // trục x
    this.y = y; // truc y
    this.radius = radius; // bán kính
    this.color = color; // màu

    // vận tốc
    this.velocity = {
      x: Math.random() * 4 - 2,
      y: Math.random() * 4 - 2,
    };
  }

  Circle.prototype.draw = function () {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.shadowColor = this.color;
    c.shadowBlur = 5;
    c.fill();
    c.closePath();

    c.beginPath();
    c.font = "30px source san pro";
    c.fillStyle = "red";
    c.textAlign = "center";
    c.shadowColor = "white";
    c.fillText("Trung Kien", mouse.x, mouse.y);
    c.fill();
    c.closePath();
    c.restore();
  };

  Circle.prototype.update = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (
      mouse.x - this.x < 75 &&
      mouse.x - this.x > -75 &&
      mouse.y - this.y < 75 &&
      mouse.y - this.y > -75
    ) {
      if (this.radius < 50) {
        this.radius += 5;
      }
    } else {
      if (this.radius > 5) {
        this.radius -= 2;
        this.x += this.velocity.x * 4;
        this.y += this.velocity.y * 4;
      }
    }
    this.collision();
    this.draw();
  };

  Circle.prototype.collision = function () {
    if (this.x >= canvas.width || this.x <= 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y >= canvas.height || this.y <= 0) {
      this.velocity.y = -this.velocity.y;
    }
  };

  let arrayCircles;

  function init() {
    arrayCircles = [];
    for (let i = 0; i < 400; i++) {
      arrayCircles.push(new Circle(createX(), createY(), 5, randomColor()));
    }
  }

  function animate() {
    window.requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    arrayCircles.forEach((circle) => {
      circle.update();
    });
  }

  init();
  animate();
});
