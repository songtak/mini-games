let bgmSound;

let giftImg;
let moonImg;

let nanumMyeongjo;

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
    "https://songtak.github.io/mini-games/assets/chuseok/NanumMyeongjo-Bold"
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
  image(moonImg, width / 2 - 200, 100, 400, 240);
  image(giftImg, 0, height - width / 2, width, width / 2);
  textSize(40);
  fill(255, 255, 255);
  text("송탁의 추석 선물", width / 2 - 130, height / 2);
  textSize(20);
  text(
    "최고점을 받으신 분에게 추석 선물을...",
    width / 2 - 140,
    height / 2 + 60
  );
  textFont(nanumMyeongjo);
  text("🎮 게임 시작 🐓", width / 2 - 40, height / 2 + 100);
}
