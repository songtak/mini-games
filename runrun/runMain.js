function setup() {
  createCanvas(windowWidth, windowHeight);
  //   if (windowWidth < 800) {
  // createCanvas(windowWidth, windowHeight);
  //   } else {
  //     createCanvas(600, 900);
  //   }

  imageMode(CENTER); // 이미지를 가로 가운데로 정렬하는 모드로 설정합니다.
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 255, 2);
  //   background(255, 255, 255);
  //   image(bubbleGif, 0, 0);
}

const handleTouchOrClick = () => {
  if (mouseOverImage(width / 2 - 50, height / 2 - 50, 100, 100)) {
    window.location.href = "../bubble/bubble.html";
  } else {
  }
};
