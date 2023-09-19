let bgmSound;

let giftImg;
let moonImg;

let nanumMyeongjo;

let startX, startY, endX, endY; // 텍스트의 위치를 저장할 변수

function setup() {
  if (windowWidth < 800) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(600, 900);
  }
  /** 배경음악 */
  bgmSound.play();

  moonImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/Moon.png"
  );
  giftImg = loadImage(
    "https://songtak.github.io/mini-games/assets/chuseok/Gift.png"
  );
  nanumMyeongjo = loadFont(
    "https://songtak.github.io/mini-games/assets/chuseok/NanumMyeongjo-Bold.ttf"
  ); // 폰트 파일 로드
}

function windowResized() {
  if (windowWidth < 800) {
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas(600, 900);
  }
}

function preload() {
  bgmSound = loadSound(
    "https://songtak.github.io/mini-games/assets/chuseok/Bgm.mp3"
  );
}

function draw() {
  background(45, 45, 61);
  fill(255, 255, 255);
  // textAlign(CENTER);
  textFont(nanumMyeongjo);
  image(moonImg, width / 2 - 200, 100, 400, 240);
  image(giftImg, 0, height - width / 2, width, width / 2);
  textSize(40);
  text("송탁의 추석 선물", width / 2 - 140, height / 2);
  textSize(20);
  // text(
  //   "최고점을 받으신 분에게 추석 선물을...",
  //   width / 2 - 140,
  //   height / 2 + 60
  // );
  startX = width / 2 - 40; // 텍스트 시작 x 좌표
  startY = height / 2 + 100; // 텍스트 시작 y 좌표
  endX = startX + textWidth("게임 시작"); // 텍스트 끝 x 좌표
  endY = startY + 20; // 텍스트 끝 y 좌표
  text("게임 시작", startX, startY);
}

function mousePressed() {
  if (
    mouseX >= startX &&
    mouseX <= endX &&
    mouseY >= startY - 20 &&
    mouseY <= endY
  ) {
    window.location.href = "http://127.0.0.1:5501/chuseok/csGame.html"; // 클릭되면 페이지 이동
  }
}
