let boatImage, group1Image;
let boatX, boatY;
let boatScale = 0.5;

function preload() {
  boatImage = loadImage('assets/transparent_boat.png');
  group1Image = loadImage('assets/Group 1.png'); 
  birdsImage = loadImage('assets/birds.png');  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  boatX = 80;
  // 确保在调整窗口大小时船只位置也会适当调整
  boatY = height - boatImage.height * 0.1 * boatScale;
  frameRate(3);
}

function draw() {
  background(230, 240, 240);
  drawLayeredMountains();
  drawWaterSurface();
  drawBoat();
  moveBoat();
  // 绘制 Group 1 图像在所有内容之上
  image(group1Image, 500, 300, 170, 150);
  image(birdsImage, 1000, 0, 300, 150);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 确保在窗口大小变化时更新船的位置
  boatY = height - boatImage.height * 0.1 * boatScale;
}

function drawLayeredMountains() {
  let layers = 5;
  let maxHeight = height / 6;
  let noiseScale = 0.01;
  for (let i = layers - 1; i >= 0; i--) {
    let baseHeight = height - (i * maxHeight * 0.5 + 120);
    let interColor = lerpColor(color(70, 130, 130, 150), color(200, 220, 220, 50), i / layers);
    fill(interColor);
    noStroke();
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 20) {
      let y = baseHeight - noise(x * noiseScale, i * 100) * maxHeight;
      vertex(x, y);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}

function drawWaterSurface() {
  fill(180, 200, 200, 180);
  rect(0, height - 100, width, 100);
}

function drawBoat() {
  tint(150, 150, 150, 150);
  image(boatImage, boatX, boatY, boatImage.width * boatScale, boatImage.height * boatScale);
  noTint();
}

function moveBoat() {
  boatX += random(1, 5);
  boatY += random(-2, 5);
  boatX = constrain(boatX, 0, width - boatImage.width * boatScale);
  boatY = constrain(boatY, height - 100 - boatImage.height * boatScale, height - boatImage.height * boatScale);
}
