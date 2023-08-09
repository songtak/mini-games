let playerImg;
let obstacleImg;
let player;
let obstacles = [];
let score = 0;
let speedMultiplier = 1;
let dragging = false;

function preload() {
  playerImg = loadImage(
    "https://songtak.github.io/mini-games/assets/img/RunMe.gif"
  );
  obstacleImg = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Rock1.png"
  );
}

function setup() {
  if (windowWidth < 1024) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(1024, 500);
  }

  player = {
    x: 50,
    y: width / 2,
    w: 60, // 이미지의 너비
    h: 60, // 이미지의 높이
    moveSpeed: 5,
  };

  setInterval(function () {
    speedMultiplier += 0.1;
  }, 2000);
}

function draw() {
  background(252, 238, 212);

  if (windowWidth < 1024) {
    translate(width / 2, height / 2);
    rotate(-PI / 2);
    translate(-height / 2, -width / 2);
  }

  // Draw player
  image(
    playerImg,
    player.x - player.h / 2,
    player.y - player.w / 2,
    player.h,
    player.w
  );

  // Randomly create obstacles
  if (random() < 0.02) {
    obstacles.push({
      x: height,
      y: random(width),
      size: 40,
      speed: random(2, 5),
    });
  }

  // Draw and move obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    image(
      obstacleImg,
      obstacles[i].x - obstacles[i].size / 2,
      obstacles[i].y - obstacles[i].size / 2,
      obstacles[i].size,
      obstacles[i].size
    );
    obstacles[i].x -= obstacles[i].speed * speedMultiplier;

    // Check for collision
    let distance = dist(player.x, player.y, obstacles[i].x, obstacles[i].y);
    if (distance < (player.w + obstacles[i].size) / 2) {
      gameOver();
    }

    // Check if the obstacle has passed out of the screen
    if (obstacles[i].x < -obstacles[i].size / 2) {
      score += 10;
      obstacles.splice(i, 1);
    }
  }

  // Display score
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
}

function gameOver() {
  noLoop();
  background(220);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", height / 2, width / 2);
  textSize(24);
  text("Final Score: " + score, height / 2, width / 2 + 40);
}

/** ====================================================================== */

function mousePressed() {
  let realX, realY;
  if (windowWidth < 1024) {
    [realX, realY] = rotatePoint(mouseX, mouseY, -PI / 2);
  } else {
    realX = mouseX;
    realY = mouseY;
  }

  if (
    realX > player.x - player.w / 2 &&
    realX < player.x + player.w / 2 &&
    realY > player.y - player.h / 2 &&
    realY < player.y + player.h / 2
  ) {
    dragging = true;
  }
}

function mouseDragged() {
  let realX, realY;
  if (windowWidth < 1024) {
    [realX, realY] = rotatePoint(mouseX, mouseY, -PI / 2);
  } else {
    realX = mouseX;
    realY = mouseY;
  }

  if (dragging) {
    player.x = realX;
    player.y = realY;
  }
  return false; // Prevent default drag behavior
}

function touchStarted() {
  let realX, realY;
  if (windowWidth < 1024) {
    [realX, realY] = rotatePoint(touches[0].x, touches[0].y, -PI / 2);
  } else {
    realX = touches[0].x;
    realY = touches[0].y;
  }

  if (dist(realX, realY, player.x, player.y) < player.w / 2) {
    dragging = true;
  }
  return false; // prevent default
}

function touchMoved() {
  let realX, realY;
  if (windowWidth < 1024) {
    [realX, realY] = rotatePoint(touches[0].x, touches[0].y, -PI / 2);
  } else {
    realX = touches[0].x;
    realY = touches[0].y;
  }

  if (dragging) {
    player.x = realX;
    player.y = realY;
  }
  return false; // prevent default
}

function rotatePoint(x, y, angle) {
  const cx = width / 2;
  const cy = height / 2;
  const cosA = cos(angle);
  const sinA = sin(angle);
  const nx = cosA * (x - cx) - sinA * (y - cy) + cx;
  const ny = sinA * (x - cx) + cosA * (y - cy) + cy;
  return [nx, ny];
}

// function touchStarted() {
//   if (dist(mouseX, mouseY, player.x, player.y) < player.w / 2) {
//     dragging = true;
//   }
//   return false; // Prevent default touch behavior
// }

// function touchMoved() {
//   if (dragging) {
//     player.x = mouseX;
//     player.y = mouseY;
//   }
//   return false; // Prevent default touch behavior (like scrolling)
// }

// function touchEnded() {
//   dragging = false;
//   return false; // Prevent default touch behavior
// }

/** ====================================================================== */
