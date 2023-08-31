let bubbles = [];
let score = 0;
let bubbleSpeed = 1; // 초당 이동 거리 (기본값 1)
let isGameStarted = false;
let missedBubbles = 0; // 놓친 버블 개수
let isOver = false; // 게임 끝
const maxMissedBubbles = 3; // 최대 놓친 버블 개수
let bombs = []; // bombGif 객체를 담을 배열
let bombSpeed = 3; // bombGif의 속도
let payWatchCoins = []; // bombGif 객체를 담을 배열
let payWatchCoinSpeed = 10; // bombGif의 속도

let bubbleImg1;
let bubbleImg2;
let popImg;
let bubbleGif;
let gameOverGif;
let bombGif;
let payWatchCoinGif;

function setup() {
  if (windowWidth < 800) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(600, 900);
  }
  setInterval(increaseSpeed, 10000); // 10초마다 속도 증가 함수 호출
  bubbleImg1 = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Bubble1.png"
  );
  bubbleImg2 = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Bubble2.png"
  );
  bubbleGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Bubble.gif"
  );
  popImg = loadImage("https://songtak.github.io/mini-games/assets/img/pop.png");
  gameOverGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/GameOver.gif"
  );
  bombGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Bomb.gif"
  );
  payWatchCoinGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/PayWatchCoin.gif"
  );
  startGame(); // 게임을 즉시 시작합니다.
}

function windowResized() {
  if (windowWidth < 800) {
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas(600, 900);
  }
}

function draw() {
  background(255, 255, 255);

  if (isGameStarted) {
    createBubble();
    createBomb();
    createPayWatchCoin();
    // setInterval(createBomb, 1000); // 10초마다 bomb 생성
  } else if (isOver) {
    // 게임이 끝났을 때 gameOver 함수 호출
    gameOver();
  }

  /* bubbleGif */
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

  /* bombGif */
  for (let i = bombs.length - 1; i >= 0; i--) {
    bombs[i].display();
    bombs[i].update();

    if (bombs[i].isOffScreen()) {
      bombs.splice(i, 1);
    }
  }

  /* payWatchCoinGif */
  for (let i = payWatchCoins.length - 1; i >= 0; i--) {
    payWatchCoins[i].display();
    payWatchCoins[i].update();

    if (payWatchCoins[i].isOffScreen()) {
      payWatchCoins.splice(i, 1);
    }
  }

  if (missedBubbles >= maxMissedBubbles) {
    gameOver();
  }

  if (!isOver) {
    textSize(24);
    text("Score: " + score, 10, 30);
  }
}

function increaseSpeed() {
  bubbleSpeed += 0.5; // 10초마다 속도를 0.5씩 증가
}
/** ====================================================================== */

function createBubble() {
  if (frameCount % (60 / bubbleSpeed) === 0) {
    let bubble = new Bubble(random(width), height);
    bubbles.push(bubble);
  }
}

// bombGif 생성 함수
function createBomb() {
  if (frameCount % 600 === 0) {
    let bomb = new Bomb(random(width), height);
    bombs.push(bomb);
  }
}

function createPayWatchCoin() {
  if (frameCount % 900 === 0) {
    let payWatchCoin = new PayWatchCoin(random(width), height);
    payWatchCoins.push(payWatchCoin);
  }
}
/** ====================================================================== */

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
        score += 10;
        missedBubbles = 0; // 버블을 클릭하면 놓친 버블 개수 초기화

        // 1초 후에 해당 버블 제거
        setTimeout(() => {
          bubbles.splice(i, 1);
        }, 100);

        break;
      }
    }
    for (let i = payWatchCoins.length - 1; i >= 0; i--) {
      if (payWatchCoins[i].contains(mouseX, mouseY)) {
        score += 50;
        setTimeout(() => {
          payWatchCoins.splice(i, 1);
        }, 100);
        break;
      }
    }

    //  bombGif 클릭 체크
    for (let i = bombs.length - 1; i >= 0; i--) {
      let d = dist(mouseX, mouseY, bombs[i].x + 20, bombs[i].y + 20);
      if (d < 20) {
        gameOver(); // 게임 오버 함수 호출
        return;
      }
    }
  }
}

function mouseOverImage(x, y, w, h) {
  // 주어진 영역(x, y, w, h)에 마우스 커서가 있는지 여부를 반환합니다.
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

/** ====================================================================== */

class Bubble {
  constructor(x, y) {
    this.x = x - 20;
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
class Bomb extends Bubble {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    image(bombGif, this.x, this.y, this.r, this.r);
  }

  update() {
    this.y -= bombSpeed;
  }
}
class PayWatchCoin extends Bubble {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    image(payWatchCoinGif, this.x, this.y, this.r, this.r);
  }

  update() {
    this.y -= bombSpeed;
  }
}

/** ====================================================================== */

function startGame() {
  isGameStarted = true;
}

function gameOver() {
  isGameStarted = false;
  isOver = true;
  gameOverGif;
  image(gameOverGif, width / 2 - 60, height / 2 - 60, 120, 120);
  textSize(28);
  textAlign(CENTER);
  text(`Score : ${score}`, width / 2, height / 2 + 100);
}

/** ====================================================================== */
