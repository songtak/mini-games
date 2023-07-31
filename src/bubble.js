let bubbles = [];
let score = 0;
let bubbleSpeed = 1; // 초당 이동 거리 (기본값 1)
let isGameStarted = false;
let missedBubbles = 0; // 놓친 버블 개수
const maxMissedBubbles = 10; // 최대 놓친 버블 개수

function setup() {
  createCanvas(400, 400);
  setInterval(increaseSpeed, 10000); // 10초마다 속도 증가 함수 호출
}

function draw() {
  background(220);

  if (isGameStarted) {
    createBubble();
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].display();
    bubbles[i].update();

    if (bubbles[i].isOffScreen()) {
      bubbles.splice(i, 1);
      if (isGameStarted) {
        missedBubbles++;
      }
    }
  }

  if (missedBubbles >= maxMissedBubbles) {
    gameOver();
  }

  textSize(24);
  text("Score: " + score, 10, 30);
}

function increaseSpeed() {
  bubbleSpeed += 0.5; // 10초마다 속도를 0.5씩 증가
}

function createBubble() {
  if (frameCount % (60 / bubbleSpeed) === 0) {
    let bubble = new Bubble(random(width), height);
    bubbles.push(bubble);
  }
}

function mousePressed() {
  if (isGameStarted) {
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].contains(mouseX, mouseY)) {
        bubbles.splice(i, 1);
        score++;
        missedBubbles = 0; // 버블을 클릭하면 놓친 버블 개수 초기화
        break;
      }
    }
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
  }

  display() {
    fill(255, 0, 150);
    ellipse(this.x, this.y, this.r * 2);
  }

  update() {
    this.y -= bubbleSpeed;
  }

  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.r;
  }

  isOffScreen() {
    return this.y < -this.r;
  }
}

function startGame() {
  isGameStarted = true;
}

function gameOver() {
  isGameStarted = false;
  textSize(36);
  textAlign(CENTER);
  text("Game Over", width / 2, height / 2);
}
