let bubbles = [];
let score = 0;
let bubbleSpeed = 1; // 초당 이동 거리 (기본값 1)
let isGameStarted = false;
let missedBubbles = 0; // 놓친 버블 개수
const maxMissedBubbles = 10; // 최대 놓친 버블 개수

let bubbleImg1;
let bubbleImg2;
let popImg;
let bubbleGif;

function setup() {
  if (screen.availWidth < 800) {
    createCanvas(screen.availWidth, screen.availHeight);
  } else {
    createCanvas(600, 900);
  }
  setInterval(increaseSpeed, 10000); // 10초마다 속도 증가 함수 호출
  bubbleImg1 = loadImage("../assets/img/Bubble1.png");
  bubbleImg2 = loadImage("../assets/img/Bubble2.png");
  bubbleGif = loadImage("../assets/img/Bubble.gif");
  popImg = loadImage("../assets/img/pop.png");
  startGame(); // 게임을 즉시 시작합니다.
}

function draw() {
  background(255, 255, 255);

  if (isGameStarted) {
    createBubble();
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].display();
    bubbles[i].update();

    if (bubbles[i].contains(mouseX, mouseY, 40, 40)) {
      cursor("pointer");
    } else {
      cursor();
    }

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

function touchStarted() {
  handleTouchOrClick();
  return false; // 이 부분은 추가적인 터치 이벤트 처리를 방지하기 위해 필요합니다.
}

function mousePressed() {
  handleTouchOrClick();
}
function handleTouchOrClick() {
  if (isGameStarted) {
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].contains(mouseX, mouseY)) {
        bubbles[i].isClicked = true; // 버블이 클릭되었다고 표시
        score++;
        missedBubbles = 0; // 버블을 클릭하면 놓친 버블 개수 초기화

        // 1초 후에 해당 버블 제거
        setTimeout(() => {
          bubbles.splice(i, 1);
        }, 100);

        break;
      }
    }
  }
}

// function handleTouchOrClick() {
//   if (isGameStarted) {
//     for (let i = bubbles.length - 1; i >= 0; i--) {
//       if (bubbles[i].contains(mouseX, mouseY)) {
//         bubbles.splice(i, 1);
//         score++;
//         missedBubbles = 0; // 버블을 클릭하면 놓친 버블 개수 초기화
//         break;
//       }
//     }
//   }
// }

function mouseOverImage(x, y, w, h) {
  // 주어진 영역(x, y, w, h)에 마우스 커서가 있는지 여부를 반환합니다.
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 40;
    this.isClicked = false; // 추가: 버블이 클릭되었는지 여부를 추적합니다.
  }

  display() {
    fill(255, 0, 150);
    if (!this.isClicked) {
      image(bubbleImg1, this.x, this.y, this.r, this.r);
    } else {
      image(popImg, this.x, this.y, this.r, this.r); // 클릭되었을 때 popImg 이미지로 변경
    }

    // ellipse(this.x, this.y, this.r * 2);
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
