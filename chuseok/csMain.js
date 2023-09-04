let bubbles = [];
let bubbleSpeed = 1; // 초당 이동 거리 (기본값 1)

let bubbleImg1;
let bubbleImg2;
let bubbleGif;
let bubbleTitleGif;
let pressStartGif;

let pointerImage = false;

let os;
let userInfo;

const ua = window.navigator.userAgent;

if (/(android)/i.test(ua)) {
  os = "android";
} else if (/(ipod|iphone|ipad)/i.test(ua)) {
  console.log("이거 타냐고");
  os = "ios";
} else {
  os = null;
}

console.log("ua", ua);
console.log("os", os);

const getPayWatchApp = (functionName, params) => {
  try {
    /** 안드로이드 디바이스일때 */
    if (deviceType === "android") {
      !_.isUndefined(params)
        ? window.PaywatchAppInterface[functionName](params)
        : window.PaywatchAppInterface[functionName]();
      /** IOS 디바이스일때 */
    } else if (deviceType === "ios") {
      if (_.isUndefined(params)) {
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#`
        );
      } else if (
        _.isString(params) ||
        _.isNumber(params) ||
        _.isBoolean(params)
      ) {
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#${params}`
        );
      } else if (_.isObject(params)) {
        const msg = JSON.stringify({});
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#${msg}`
        );
      }
    } else {
      console.log("[OS ERROR] OS is neither AOS nor IOS");
    }
  } catch (error) {
    console.groupCollapsed("[BRIDGE ERROR] bridge name : ", functionName);
    console.error(error);
    console.groupEnd();
  }
};

function setup() {
  getPayWatchApp("getUserInfo");

  window.setUserInfo = (params) => {
    alert(params);
    userInfo = JSON.parse(params).userType;
  };

  if (windowWidth < 800) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(600, 900);
  }

  bubbleImg1 = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Bubble1.png"
  );
  bubbleImg2 = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Bubble2.png"
  );
  bubbleGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/Bubble.gif"
  );
  bubbleTitleGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/BubbleTitle.gif"
  );
  pressStartGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/PressStart.gif"
  );

  imageMode(CENTER); // 이미지를 가로 가운데로 정렬하는 모드로 설정합니다.
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
  //   background(255, 255, 255);
  //   image(bubbleGif, 0, 0);

  createBubble();

  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].display();
    bubbles[i].update();

    if (bubbles[i].isOffScreen()) {
      bubbles.splice(i, 1);
    }
  }

  //   textSize(24);
  //   text("BUBBLE", 300, 30);
  //   textAlign(CENTER, CENTER);
  image(bubbleTitleGif, width / 2, height / 4, 200, 200);
  image(pressStartGif, width / 2, height / 2, 100, 100);

  if (mouseOverImage(width / 2 - 50, height / 2 - 50, 100, 100)) {
    cursor("pointer");
  } else {
    cursor();
  }
}

function createBubble() {
  if (frameCount % (60 / bubbleSpeed) === 0) {
    let bubble = new Bubble(random(width), height);
    bubbles.push(bubble);
  }
}

/** 이미지에 올라가 있을 때 */
function mouseOverImage(x, y, w, h) {
  // 주어진 영역(x, y, w, h)에 마우스 커서가 있는지 여부를 반환합니다.
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

/** 이벤트 클릭 함수 */
function mouseClicked() {
  handleTouchOrClick();
}

// function touchStarted() {
//   handleTouchOrClick();

//   // 터치의 좌표
//   // let touchX = touches[touches.length - 1].x;
//   // let touchY = touches[touches.length - 1].y;
//   window.location.href = "../chuseok/csGame.html";

//   return false; // 이 부분은 추가적인 터치 이벤트 처리를 방지하기 위해 필요합니다.
// }

const handleTouchOrClick = () => {
  if (mouseOverImage(width / 2 - 50, height / 2 - 50, 100, 100)) {
    window.location.href = "../chuseok/csGame.html";
  }
};

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 60;
  }

  display() {
    fill(255, 0, 150);
    image(bubbleImg1, this.x, this.y, this.r, this.r);
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
