let bubbles = [];
let score = 0;
let gameEnded = false; // 게임 종료 상태
let bubbleSpeed = 4; // 초당 이동 거리 (기본값 1)
let isGameStarted = false;
let isOver = false; // 게임 끝
const maxMissedBubbles = 3; // 최대 놓친 버블 개수
let bombs = []; // bomb 객체를 담을 배열
let bombSpeed = 3; // bomb의 속도
let payWatchCoins = []; // bomb 객체를 담을 배열
let payWatchCoinSpeed = 10; // Logo의 속도
let nextBubbleTime = 0; // 다음 버블이 나오는 시간

let startTime; // 게임 시작 시간
let countdown = 30; // 30초 카운트다운
let gameOverCount = 0;

let gameOverImg;
let bombImg;
let bombExplodesImg;
let payWatchLogoImg;
let paywatchLogoPopImg;

let scoreImg;
let timeImg;
let moonImg;
let giftImg;

let songImg1;
let songImg2;
let songImg3;
let songImg4;

let eatingSound;
let logoSound;
let bombSound;
let bgmSound;
let gameOverSound;

/** ===[이미지 정의]=================================================================== */

function setup() {
  if (windowWidth < 800) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(600, 900);
  }
  setInterval(increaseSpeed, 2000); // 10초마다 속도 증가 함수 호출
  /** 배경음악 */
  bgmSound.play();

  popImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/SongPop.png"
  );
  gameOverImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/GameOver.png"
  );
  bombImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/Bomb.png"
  );
  bombExplodesImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/BombExplodes.png"
  );
  payWatchLogoImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/PayWatchLogo.png"
  );
  paywatchLogoPopImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/PaywatchLogoPop.png"
  );

  scoreImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/Score.png"
  );
  timeImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/Time.png"
  );
  moonImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/Moon.png"
  );
  giftImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/Gift.png"
  );

  songImg1 = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/SongImg1.png"
  );
  songImg2 = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/SongImg2.png"
  );
  songImg3 = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/SongImg3.png"
  );
  songImg4 = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/SongImg4.png"
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

function preload() {
  eatingSound = loadSound(
    "https://songtak.github.io/mini-games/assets/chuseok/ClickSong.wav"
  );
  logoSound = loadSound(
    "https://songtak.github.io/mini-games/assets/chuseok/ClickLogo.wav"
  );
  bombSound = loadSound(
    "https://songtak.github.io/mini-games/assets/chuseok/ClickBomb.wav"
  );
  bgmSound = loadSound(
    "https://songtak.github.io/mini-games/assets/chuseok/Bgm.mp3"
  );
  gameOverSound = loadSound(
    "https://songtak.github.io/mini-games/assets/chuseok/GameOver.wav"
  );
}

/** ===[이미지 생성]=================================================================== */

function draw() {
  background(45, 45, 61); //

  image(giftImg, 0, height - width / 2, width, width / 2);

  if (countdown > 0) {
    createBubble();
    createBomb();
    createPayWatchCoin();
    image(moonImg, 30, 100, 160, 100);
    // setInterval(createBomb, 1000); // 10초마다 bomb 생성
  } else {
    // 게임이 끝났을 때 gameOver 함수 호출
    gameOver();
  }

  /* bubble */
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

  /* bomb */
  for (let i = bombs.length - 1; i >= 0; i--) {
    bombs[i].display();
    bombs[i].update();

    if (bombs[i].isOffScreen()) {
      bombs.splice(i, 1);
    }
  }

  /* payWatchCoin */
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
    fill(255, 255, 255);
    textSize(22);
    textAlign(LEFT);
    image(scoreImg, 30, 30, 80, 16);
    text(score, 120, 46);
  }
}

/** ===[송편 속도 설정]=============================================================== */
function increaseSpeed() {
  bubbleSpeed += 0.5; // 10초마다 속도를 0.5씩 증가
}

/** ===[시간 제한]=================================================================== */
function updateCountdown() {
  let currentTime = millis();
  countdown = 30 - int((currentTime - startTime) / 1000);
  if (countdown <= 0) {
    gameOver(); // 시간이 다 되면 게임 오버
  }
}

function displayCountdown() {
  textSize(22);
  textAlign(RIGHT);
  image(timeImg, width - 120, 30, 60, 14);

  text(countdown, width - 20, 46);
}

/** ===[아이템 생성]=================================================================== */

let totalBubbles = 80; // 총 버블 수
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

// bomb 생성 함수
function createBomb() {
  if (frameCount % 100 === 0) {
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
/** ===[아이템 클릭]=================================================================== */

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
      if (bubbles[i].contains(mouseX, mouseY, 60, 30)) {
        bubbles[i].isClicked = true; // 버블이 클릭되었다고 표시
        score += 10;
        eatingSound.play(); // 사운드 재생

        setTimeout(() => {
          bubbles.splice(i, 1);
        }, 100);

        break;
      }
    }
    for (let i = payWatchCoins.length - 1; i >= 0; i--) {
      if (payWatchCoins[i].contains(mouseX, mouseY, 40, 40)) {
        payWatchCoins[i].isClicked = true; // 버블이 클릭되었다고 표시
        logoSound.play();

        score += 50;
        setTimeout(() => {
          payWatchCoins.splice(i, 1);
        }, 100);
        break;
      }
    }

    for (let i = bombs.length - 1; i >= 0; i--) {
      if (bombs[i].contains(mouseX, mouseY, 40, 40)) {
        bombs[i].isClicked = true; // 버블이 클릭되었다고 표시
        bombSound.play();
        setTimeout(() => {
          bombs.splice(i, 1);
        }, 100);
        // gameOver();
        break;
      }
    }
  }
}

function mouseOverImage(x, y, w, h) {
  // 주어진 영역(x, y, w, h)에 마우스 커서가 있는지 여부를 반환합니다.
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

/** ===[게임 시작과 끝]=================================================================== */

function startGame() {
  isGameStarted = true;
}

let isGameOverSoundPlaying = false;

function gameOver() {
  bgmSound.stop();
  isGameStarted = false;
  isOver = true;
  gameOverImg;
  countdown = 0;

  image(moonImg, width / 2 - 80, height / 6, 160, 100);
  image(gameOverImg, width / 2 - 60, height / 2 - 60, 120, 80);
  textSize(22);
  textAlign(CENTER);
  text(score > 1000 ? 1000 : score, width / 2 + 40, height / 2 + 66);
  image(scoreImg, width / 2 - 70, height / 2 + 50, 80, 16);
  isOver === true && playGameOverSound();

  let currentTime = millis();
  gameOverCount = 6 - int((currentTime - startTime) / 1000);

  // if (gameOverCount <= 0) {
  //   window.location.href =
  //     "https://paywatch-stage-webapp.paywatchglobal.com/event/22";
  // }
  // setTimeout(() => {
  //   // window.location.href = "http://127.0.0.1:5500/chuseok/csGame.html";
  //   window.location.href =
  //     "https://paywatch-stage-webapp.paywatchglobal.com/event/22";
  // }, 3000);

  // setTimeout(() => {
  //   window.location.href =
  //     "https://paywatch-stage-webapp.paywatchglobal.com/event/22";
  // }, 1800);
}

function playGameOverSound() {
  if (!isGameOverSoundPlaying) {
    isGameOverSoundPlaying = true;
    gameOverSound.play();
  }
}

/** ===[아이템 정의]=================================================================== */

class Bubble {
  constructor(x, y) {
    this.x = x - 20;
    this.y = y;
    this.r = 40;
    this.isClicked = false; // 버블이 클릭되었는지 여부를 추적합니다.
    this.selectedImage = random([songImg1, songImg2, songImg3, songImg4]); // 랜덤하게 이미지를 선택합니다.
  }

  display() {
    if (isOver === false) {
      // Bubble을 그립니다.
      if (!this.isClicked) {
        image(this.selectedImage, this.x, this.y, 60, 30); // 선택된 이미지를 사용합니다.
      } else {
        image(popImg, this.x, this.y, this.r, this.r * 0.5); // 클릭되었을 때 popImg 이미지로 변경
      }
    }
  }

  update() {
    this.y += bubbleSpeed;
  }

  // contains(x, y) {
  //   let d = dist(x, y, this.x, this.y);
  //   return d < this.r;
  // }
  contains(x, y, w, h) {
    // w와 h는 아이콘의 너비와 높이입니다.
    return x > this.x && x < this.x + w && y > this.y && y < this.y + h;
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
    if (isOver === false) {
      if (!this.isClicked) {
        image(bombImg, this.x, this.y, 40, 40);
      } else {
        image(bombExplodesImg, this.x, this.y, this.r, this.r); // 클릭되었을 때 popImg 이미지로 변경
      }
    }
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
    if (isOver === false) {
      if (!this.isClicked) {
        image(payWatchLogoImg, this.x, this.y, this.r, this.r);
      } else {
        image(paywatchLogoPopImg, this.x, this.y, this.r, this.r * 0.5); // 클릭되었을 때 popImg 이미지로 변경
      }
    }
  }

  update() {
    this.y += payWatchCoinSpeed;
  }
}

/** ===[브릿지 통신]==================================================================== */

let os;
let userInfo;

/** 브릿지 통신 */
const getPayWatchApp = (functionName, params) => {
  try {
    /** 안드로이드 디바이스일때 */
    if (os === "android") {
      typeof params !== "undefined" && params
        ? window.PaywatchAppInterface[functionName](params)
        : window.PaywatchAppInterface[functionName]();
      /** IOS 디바이스일때 */
    } else if (os === "ios") {
      if (typeof params === "undefined") {
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#`
        );
      } else if (
        typeof params === "string" &&
        typeof params === "number" &&
        typeof params === "boolean"
      ) {
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#${params}`
        );
      } else if (typeof params === "object") {
        const msg = JSON.stringify({});
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#${msg}`
        );
      }
    } else {
      console.log("[OS ERROR] OS is neither AOS nor IOS");
    }
  } catch (error) {
    console.log("error", error);
  }
};

/** 디바이스 정보 */
const ua = window.navigator.userAgent;

/** os 정보 저장 */
if (/(android)/i.test(ua)) {
  os = "android";
} else if (/(ipod|iphone|ipad)/i.test(ua)) {
  os = "ios";
} else {
  os = null;
}

/** 브릿지 호출 */
getPayWatchApp("getUserInfo");

/** 앱->웹 브릿지 정보 취득 */
window.setUserInfo = (params) => {
  console.log("setUserInfo : ", JSON.parse(params));
  userInfo = JSON.parse(params).userType;
};

/** =========================================================================== */
