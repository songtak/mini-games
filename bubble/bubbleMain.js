let bubbles = [];
let bubbleSpeed = 1; // 초당 이동 거리 (기본값 1)

let bubbleImg1;
let bubbleImg2;
let bubbleGif;
let bubbleTitleGif;
let pressStartGif;

let pointerImage = false;

function setup() {
  // if (screen.availWidth < 800) {
  //   createCanvas(screen.availWidth, screen.availHeight);
  // } else {
  //   createCanvas(600, 900);
  // }

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
  // bubbleImg2 = loadImage("../assets/img/Bubble2.png");
  // bubbleGif = loadImage("/assets/img/Bubble.gif");
  // bubbleTitleGif = loadImage("/assets/img/BubbleTitle.gif");
  // pressStartGif = loadImage("/assets/img/PressStart.gif");
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
  image(bubbleTitleGif, width / 2, height / 4);
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
  if (mouseOverImage(width / 2 - 50, height / 2 - 50, 100, 100)) {
    window.location.href = "../bubble/bubble.html";
  }
}

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
