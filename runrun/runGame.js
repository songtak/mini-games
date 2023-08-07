let player;
let obstacles = [];
let score = 0;
let speedMultiplier = 1;

function setup() {
  createCanvas(400, 400);
  player = {
    x: 50,
    y: height / 2,
    size: 30,
    moveSpeed: 5,
  };

  // 매 20초마다 speedMultiplier를 증가시킴
  setInterval(function () {
    speedMultiplier += 0.1;
  }, 20000);
}

function draw() {
  background(220);

  // Player movement
  if (keyIsDown(UP_ARROW) && player.y > 0) {
    player.y -= player.moveSpeed;
  }
  if (keyIsDown(DOWN_ARROW) && player.y < height) {
    player.y += player.moveSpeed;
  }

  // Draw player
  fill(0, 0, 255);
  ellipse(player.x, player.y, player.size);

  // Create obstacles
  if (random() < 0.02) {
    obstacles.push({
      x: width,
      y: random(height),
      size: random(10, 30),
      speed: random(2, 6) * speedMultiplier,
    });
  }

  // Draw and move obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    fill(255, 0, 0);
    ellipse(obstacles[i].x, obstacles[i].y, obstacles[i].size);
    obstacles[i].x -= obstacles[i].speed;

    // Check for collision
    let distance = dist(player.x, player.y, obstacles[i].x, obstacles[i].y);
    if (distance < (player.size + obstacles[i].size) / 2) {
      // Game Over
      noLoop();
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("Game Over", width / 2, height / 2);
    }

    // Remove off-screen obstacles and add score
    if (obstacles[i].x < 0) {
      obstacles.splice(i, 1);
      score += 10;
    }
  }

  // Display score
  fill(0);
  textSize(16);
  text("Score: " + score, 10, 20);
}

function mousePressed() {
  // If mouse is clicked or screen is touched above the player's current position
  if (mouseY < player.y) {
    player.y -= player.moveSpeed;
  }
  // If mouse is clicked or screen is touched below the player's current position
  else if (mouseY > player.y) {
    player.y += player.moveSpeed;
  }
}
