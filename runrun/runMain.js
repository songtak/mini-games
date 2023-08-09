let runRunTitleGif;
let pressStartGif;

const isMobile = () => {
  const user = navigator.userAgent;
  let isCheck = false;

  if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
    isCheck = true;
  }

  return isCheck;
};

function setup() {
  if (isMobile()) {
    if (windowWidth < 1024) {
      createCanvas(windowWidth, windowHeight);
    } else {
      createCanvas(1024, 500);
    }
  } else {
    createCanvas(1024, 500);
  }

  runRunTitleGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/RunRunTitle.gif"
  );

  pressStartGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/PressStart.gif"
  );

  imageMode(CENTER); // 이미지를 가로 가운데로 정렬하는 모드로 설정합니다.
}

function draw() {
  background(252, 238, 212);

  if (isMobile()) {
    if (windowWidth < 1024) {
      translate(width / 2, height / 2);
      rotate(-PI / 2);
      translate(-height / 2, -width / 2);
    }
    image(runRunTitleGif, height / 2, width / 4, 200, 200);
    image(pressStartGif, height / 2, width / 1.4, 100, 100);
  } else {
    image(runRunTitleGif, width / 2, height / 4, 200, 200);
    image(pressStartGif, width / 2, height / 1.4, 100, 100);
  }
}

const handleTouchOrClick = () => {
  if (mouseOverImage(width / 2 - 50, height / 2 - 50, 100, 100)) {
    window.location.href = "../runrun/runGame.html";
  }
};

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
  window.location.href = "../runrun/runGame.html";

  return false; // 이 부분은 추가적인 터치 이벤트 처리를 방지하기 위해 필요합니다.
}
