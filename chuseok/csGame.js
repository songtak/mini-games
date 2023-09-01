let bubbles = [];
let score = 0;
let gameEnded = false; // 게임 종료 상태
let bubbleSpeed = 3; // 초당 이동 거리 (기본값 1)
let isGameStarted = false;
let isOver = false; // 게임 끝
const maxMissedBubbles = 3; // 최대 놓친 버블 개수
let bombs = []; // bombGif 객체를 담을 배열
let bombSpeed = 3; // bombGif의 속도
let payWatchCoins = []; // bombGif 객체를 담을 배열
let payWatchCoinSpeed = 10; // bombGif의 속도
let nextBubbleTime = 0; // 다음 버블이 나오는 시간

let startTime; // 게임 시작 시간
let countdown = 30; // 30초 카운트다운

let bubbleImg1;
let bubbleImg2;
let popImg;
let bubbleGif;
let gameOverGif;
let bombGif;
let payWatchCoinGif;

let whiteSongImg;
let greenSongImg;
let pinkSongImg;

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
  whiteSongImg = loadImage(
    "https://songtak.github.io/mini-games/assets/img/WhiteSong.png"
  );
  greenSongImg = loadImage(
    "https://songtak.github.io/mini-games/assets/img/GreenSong.png"
  );
  pinkSongImg = loadImage(
    "https://songtak.github.io/mini-games/assets/img/PinkSong.png"
  );

  startGame(); // 게임을 즉시 시작합니다.
  startTime = millis(); // 현재 시간을 저장
}

function windowResized() {
  if (windowWidth < 800) {
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas(600, 900);
  }
}

function draw() {
  background(255, 255, 255); //
  // background(255, 244, 230); //

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

  if (score >= 1000 && !gameEnded) {
    gameEnded = true; // 게임 종료 상태로 변경
    noLoop(); // draw() 함수의 반복을 중지
    gameOver();
  }

  if (isGameStarted && !isOver) {
    updateCountdown();
    displayCountdown();
  }

  if (!isOver) {
    textSize(24);
    textAlign(LEFT);
    text("Score: " + score, 10, 30);
  }
}

/** ====================================================================== */
function increaseSpeed() {
  bubbleSpeed += 0.5; // 10초마다 속도를 0.5씩 증가
}
/** ====================================================================== */
function updateCountdown() {
  let currentTime = millis();
  countdown = 30 - int((currentTime - startTime) / 1000);
  if (countdown <= 0) {
    gameOver(); // 시간이 다 되면 게임 오버
  }
}

function displayCountdown() {
  textSize(24);
  textAlign(RIGHT);
  text(`Time: ${countdown}`, width - 10, 30);
}
/** ====================================================================== */

// function createBubble() {
//   if (frameCount % (60 / bubbleSpeed) === 0) {
//     let bubble = new Bubble(random(width), -40); // y 좌표를 -40으로 설정
//     bubbles.push(bubble);
//   }
// }

// function createBubble() {
//   if (millis() >= nextBubbleTime) {
//     let bubble = new Bubble(random(width), -40); // y 좌표를 -40으로 설정
//     bubbles.push(bubble);
//     nextBubbleTime = millis() + 1000 / bubbleSpeed; // 다음 버블이 나오는 시간 업데이트
//   }
// }

let totalBubbles = 110; // 총 버블 수
let totalTime = 30000; // 총 시간 (30초 = 30000 밀리초)
let bubblesCreated = 0; // 생성된 버블 수

function createBubble() {
  let currentTime = millis() - startTime;
  let bubblesNeeded = map(currentTime, 0, totalTime, 0, totalBubbles); // 현재까지 필요한 버블 수

  // 아직 생성되지 않은 버블이 있다면
  while (bubblesCreated < Math.floor(bubblesNeeded)) {
    let bubble = new Bubble(random(width), -40);
    bubbles.push(bubble);
    bubblesCreated++;
  }
}

// bombGif 생성 함수
function createBomb() {
  if (frameCount % 90 === 0) {
    let bomb = new Bomb(random(width), -40); // y 좌표를 -40으로 설정
    bombs.push(bomb);
  }
}

function createPayWatchCoin() {
  if (frameCount % 300 === 0) {
    let payWatchCoin = new PayWatchCoin(random(width), -40); // y 좌표를 -40으로 설정
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

        // 1초 후에 해당 버블 제거
        setTimeout(() => {
          bubbles.splice(i, 1);
        }, 100);

        break;
      }
    }
    for (let i = payWatchCoins.length - 1; i >= 0; i--) {
      if (payWatchCoins[i].contains(mouseX, mouseY)) {
        payWatchCoins[i].isClicked = true; // 버블이 클릭되었다고 표시

        score += 100;
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
    this.isClicked = false; // 버블이 클릭되었는지 여부를 추적합니다.
    this.selectedImage = random([whiteSongImg, greenSongImg, pinkSongImg]); // 랜덤하게 이미지를 선택합니다.
  }

  display() {
    fill(255, 0, 150);
    if (!this.isClicked) {
      image(this.selectedImage, this.x, this.y, this.r, this.r); // 선택된 이미지를 사용합니다.
    } else {
      image(popImg, this.x, this.y, this.r, this.r); // 클릭되었을 때 popImg 이미지로 변경
    }

    // ellipse(this.x, this.y, this.r * 2);
  }

  update() {
    this.y += bubbleSpeed;
  }

  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.r + 5; // 반경을 5픽셀 더 늘림
    // return d < this.r;
  }

  isOffScreen() {
    return this.y > height + this.r;
    // return this.y < -this.r;
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
    this.y += bombSpeed;
  }
}
class PayWatchCoin extends Bubble {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    // image(payWatchCoinGif, this.x, this.y, this.r, this.r);
    if (!this.isClicked) {
      image(payWatchCoinGif, this.x, this.y, this.r, this.r);
    } else {
      image(popImg, this.x, this.y, this.r, this.r); // 클릭되었을 때 popImg 이미지로 변경
    }
  }

  update() {
    this.y += payWatchCoinSpeed;
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
  text(`Score : ${score > 1000 ? 1000 : score}`, width / 2, height / 2 + 100);
}

/** ====================================================================== */
