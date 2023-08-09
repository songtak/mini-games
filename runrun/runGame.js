let playerImg;
let obstacleImg;
let player;
let obstacles = [];
let score = 0;
let speedMultiplier = 1;
let dragging = false;
let isGameOver = false;

const isMobile = () => {
  const user = navigator.userAgent;
  let isCheck = false;

  if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
    isCheck = true;
  }

  return isCheck;
};

function preload() {
  playerImg = loadImage(
    "https://songtak.github.io/mini-games/assets/img/RunMe.gif"
  );
  obstacleImg = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Rock1.png"
  );
}

function setup() {
  if (isMobile()) {
    if (windowWidth < 1024) {
      createCanvas(windowWidth, windowHeight);
    } else {
      createCanvas(1024, 500);
    }
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
  if (isMobile()) {
    if (windowWidth < 1024) {
      translate(width / 2, height / 2);
      rotate(-PI / 2);
      translate(-height / 2, -width / 2);

      /** Draw player */
      image(
        playerImg,
        player.x - player.h / 2,
        player.y - player.w / 2,
        player.h,
        player.w
      );
    }
  } else {
    /** Draw player */
    image(
      playerImg,
      player.x - player.w / 2,
      player.y - player.h / 2,
      player.w,
      player.h
    );
  }

  // Randomly create obstacles
  if (isMobile()) {
    if (random() < 0.02) {
      obstacles.push({
        x: height,
        y: random(width),
        size: 40,
        speed: random(2, 5),
      });
    }
  } else {
    if (random() < 0.02) {
      obstacles.push({
        x: width,
        y: random(height),
        size: 40,
        speed: random(2, 5),
      });
    }
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

  !isGameOver && text("Score: " + score, 10, 10);
}

function gameOver() {
  isGameOver = true;
  noLoop();
  background(252, 238, 212);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", height / 2, width / 2);
  textSize(24);
  text("Final Score: " + score, height / 2, width / 2 + 40);
}

/** ====================================================================== */

function getTransformedCoordinates(x, y) {
  if (windowWidth < 1024) {
    return [y, width - x];
  } else {
    return [x, y];
  }
}

function mousePressed() {
  let [realX, realY] = getTransformedCoordinates(mouseX, mouseY);

  if (
    windowHeight - realX > player.x - player.w / 2 &&
    windowHeight - realX < player.x + player.w / 2 &&
    windowWidth - realY > player.y - player.h / 2 &&
    windowWidth - realY < player.y + player.h / 2
  ) {
    dragging = true;
  }
}

function mouseDragged() {
  let [realX, realY] = getTransformedCoordinates(mouseX, mouseY);

  if (dragging) {
    player.x = windowHeight - realX;
    player.y = windowWidth - realY;
  }
  return false; // Prevent default drag behavior
}

function touchStarted() {
  let [realX, realY] = getTransformedCoordinates(touches[0].x, touches[0].y);

  if (
    dist(windowHeight - realX, windowWidth - realY, player.x, player.y) <
    player.w / 2
  ) {
    dragging = true;
  }
  return false; // prevent default
}

function touchMoved() {
  let [realX, realY] = getTransformedCoordinates(touches[0].x, touches[0].y);

  console.log("dragging", dragging);
  if (dragging) {
    player.x = windowHeight - realX;
    player.y = windowWidth - realY;
  }
  return false; // prevent default
}

/** ====================================================================== */
