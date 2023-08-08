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
  if (windowWidth < 800) {
    // createCanvas(windowWidth, windowHeight);

    // canvas를 생성하고 화면 중앙에 위치시킵니다.
    let cnv = createCanvas(windowHeight, windowWidth);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  } else {
    createCanvas(600, 900);
  }
  player = {
    x: 50,
    y: height / 2,
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

  if (windowWidth < 800) {
    translate(width / 2, height / 2);
    rotate(-PI / 2);
    translate(-height / 2, -width / 2);
  }

  // Draw player
  image(
    playerImg,
    player.x - player.w / 2,
    player.y - player.h / 2,
    player.w,
    player.h
  );

  // Randomly create obstacles
  if (random() < 0.02) {
    obstacles.push({
      x: width,
      y: random(height),
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
  text("Game Over", width / 2, height / 2);
  textSize(24);
  text("Final Score: " + score, width / 2, height / 2 + 40);
}

/** ====================================================================== */

function mousePressed() {
  if (
    mouseX > player.x - player.w / 2 &&
    mouseX < player.x + player.w / 2 &&
    mouseY > player.y - player.h / 2 &&
    mouseY < player.y + player.h / 2
  ) {
    dragging = true;
  }
}

function mouseDragged() {
  if (dragging) {
    player.x = mouseX;
    player.y = mouseY;
  }
  return false; // Prevent default drag behavior
}

function mouseReleased() {
  dragging = false;
}

/** ====================================================================== */
function touchStarted() {
  if (dist(touches[0].x, touches[0].y, player.x, player.y) < player.w / 2) {
    dragging = true;
  }
  return false; // prevent default
}

function touchMoved() {
  if (dragging) {
    player.x = touches[0].x;
    player.y = touches[0].y;
  }
  return false; // prevent default
}

function touchEnded() {
  dragging = false;
  return false; // prevent default
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
