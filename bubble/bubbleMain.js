let bubble1;
let bubble2;

function setup() {
  console.log("??");
  if (screen.availWidth < 800) {
    createCanvas(screen.availWidth, screen.availHeight);
  } else {
    createCanvas(600, 900);
  }

  bubble1 = loadImage("../assets/img/bubble1.png");
  bubble2 = loadImage("../assets/img/bubble2.png");
}

function draw() {
  background(255, 246, 219);
}
