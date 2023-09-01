let bubbles = [];
let bubbleSpeed = 1; // 초당 이동 거리 (기본값 1)

let bubbleImg1;
let bubbleImg2;
let bubbleGif;
let bubbleTitleGif;
let pressStartGif;

let pointerImage = false;

const firebaseConfig = {
  apiKey: "AIzaSyDeDG3C9i3BZLa8JXGTJcOUCla2rwSskik",
  authDomain: "test-c81cd.firebaseapp.com",
  projectId: "test-c81cd",
  storageBucket: "test-c81cd.appspot.com",
  messagingSenderId: "485320566376",
  appId: "1:485320566376:web:7b148995b1f40879c93ddd",
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function setup() {
  if (windowWidth < 800) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(600, 900);
  }
  getUsers();

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

const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  setUsers(data.docs.map((doc) => ({ ...doc.data() })));
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

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

function touchStarted() {
  handleTouchOrClick();

  // 터치의 좌표
  // let touchX = touches[touches.length - 1].x;
  // let touchY = touches[touches.length - 1].y;
  window.location.href = "../bubble/bubble.html";

  return false; // 이 부분은 추가적인 터치 이벤트 처리를 방지하기 위해 필요합니다.
}

const handleTouchOrClick = () => {
  if (mouseOverImage(width / 2 - 50, height / 2 - 50, 100, 100)) {
    window.location.href = "../bubble/bubble.html";
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
