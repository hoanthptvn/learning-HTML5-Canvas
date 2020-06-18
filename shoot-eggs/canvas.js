var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var ball = {
  x: 20,
  y: 20,
  dx: 5,
  dy: 2,
  radius: 10,
};

var paddle = {
  width: 70,
  height: 10,
  x: 0,
  y: canvas.height - 10,
  speed: 10,

  // thêm cờ để xem có đang dữ phím hay không.
  isMovingLeft: false,
  isMovingRight: false,
};

var BrickConfig = {
  offsetX: 25,
  offsetY: 25,
  margin: 25,
  height: 15,
  width: 70,
  totalRow: 3,
  totalCol: 5,
};

var isGameOver = false;
var isGameWin = false;
var userScore = 0;
var maxScore = BrickConfig.totalRow * BrickConfig.totalCol;

var BrickList = [];

for (var i = 0; i < BrickConfig.totalRow; i++) {
  for (var j = 0; j < BrickConfig.totalCol; j++) {
    BrickList.push({
      x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.margin),
      y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.margin),
      isBroke: false,
    });
  }
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 37) {
    paddle.isMovingLeft = false;
  } else if (event.keyCode === 39) {
    paddle.isMovingRight = false;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37) {
    paddle.isMovingLeft = true;
  } else if (event.keyCode === 39) {
    paddle.isMovingRight = true;
  }
});

function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = "blue";
  context.fill();
  context.closePath();
}

function drawPaddle() {
  context.beginPath();
  context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  context.fill();
  context.closePath();
}

function drawBricks() {
  BrickList.forEach((item) => {
    if (!item.isBroke) {
      context.beginPath();
      context.rect(item.x, item.y, BrickConfig.width, BrickConfig.height);
      context.fill();
      context.closePath();
    }
  });
}

function handleBallCollision() {
  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y < ball.radius) {
    ball.dy = -ball.dy;
  }
}

function handleBallCollisionPaddle() {
  if (
    ball.x + ball.radius >= paddle.x &&
    ball.x + ball.radius <= paddle.x + paddle.width &&
    ball.y + ball.radius >= canvas.height - paddle.height
  ) {
    ball.dy = -ball.dy;
  }
}

function handleBallCollisionBricks() {
  BrickList.forEach((brick) => {
    if (!brick.isBroke) {
      if (
        ball.x >= brick.x &&
        ball.x <= brick.x + BrickConfig.width &&
        ball.y + ball.radius >= brick.y &&
        ball.y - ball.radius <= brick.y + BrickConfig.height
      ) {
        ball.dy = -ball.dy;
        brick.isBroke = true;
        userScore += 1;
        if (userScore >= maxScore) {
          isGameOver = true;
          isGameWin = true;
        }
      }
    }
  });
}

function updateBallPosition() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function updatePaddlePosition() {
  if (paddle.isMovingLeft) {
    paddle.x -= paddle.speed;
  } else if (paddle.isMovingRight) {
    paddle.x += paddle.speed;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  } else if (paddle.x > canvas.width - paddle.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

function checkGameOver() {
  if (ball.y > canvas.height - ball.radius) {
    isGameOver = true;
  }
}

function handleGameOver() {
  if (isGameWin) {
    console.log("You win");
  } else {
    console.log("You lose");
  }
}

function moveBall() {
  if (!isGameOver) {
    window.requestAnimationFrame(moveBall);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();

    handleBallCollision();
    handleBallCollisionPaddle();
    handleBallCollisionBricks();

    updateBallPosition();
    updatePaddlePosition();

    checkGameOver();
  } else {
    handleGameOver();
  }
}

moveBall();
