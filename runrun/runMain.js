let runRunTitleGif;
let pressStartGif;

function setup() {
  if (windowHeight < windowWidth && windowWidth < 1000) {
    createCanvas(windowWidth, windowHeight);
  } else if (windowHeight < windowWidth && windowWidth < 1000) {
    createCanvas(windowWidth, 900);
  } else {
    createCanvas(600, 900);
  }

  runRunTitleGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/RunRunTitle.gif"
  );

  pressStartGif = loadImage(
    "https://songtak.github.io/mini-games/assets/img/PressStart.gif"
  );

  imageMode(CENTER); // 이미지를 가로 가운데로 정렬하는 모드로 설정합니다.
}

function windowResized() {
  if (windowHeight < windowWidth && windowWidth < 1000) {
    createCanvas(windowWidth, windowHeight);
  } else if (windowHeight < windowWidth && windowWidth > 1000) {
    createCanvas(windowWidth, 900);
  } else {
    // createCanvas(600, 900);
  }
}

function draw() {
  background(252, 238, 212);
  //   background(255, 255, 255);

  image(runRunTitleGif, width / 2, height / 4, 200, 200);
  image(pressStartGif, width / 2, height / 2, 100, 100);
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
