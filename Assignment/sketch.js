let boatImage, birdsImage;
let doveImages = [];
let dovePositions = [
  { x: 70, y: 600, width: 200, height: 180 },
  { x: 240, y: 500, width: 140, height: 120 },
  { x: 340, y: 320, width: 200, height: 180 },
  { x: 500, y: 200, width: 220, height: 180 },
  { x: 720, y: 120, width: 300, height: 220 },
  { x: 950, y: 200, width: 400, height: 300 },
  { x: 670, y: 160, width: 400, height: 300 },
  { x: 300, y: 60, width: 500, height: 400 },
  { x: 10, y: 0, width: 600, height: 600 }
];
let boatX, boatY;
let boatScale = 0.5;
let showDoves = false;
let currentFrame = 0;

function preload() {
  boatImage = loadImage('assets/transparent_boat.png');
  birdsImage = loadImage('assets/birds.png');
  for (let i = 1; i <= 9; i++) {
    doveImages.push(loadImage(`assets/doves/dove${i}.png`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  boatX = 80;
  boatY = height - boatImage.height * 0.1 * boatScale;
  frameRate(5);
  noStroke();
}

function draw() {
  background(230, 240, 240);
  drawLayeredMountains();
  drawWaterSurface();
  drawBoat();
  moveBoat();
  image(birdsImage, 1000, 0, 300, 150);

  if (showDoves) {
    let index = currentFrame % doveImages.length;
    let pos = dovePositions[index];
    image(doveImages[index], pos.x, pos.y, pos.width, pos.height);

    if (index === doveImages.length - 1 && currentFrame >= doveImages.length - 1) {
      showDoves = false;  // Stop showing doves after one complete cycle
    }
    currentFrame++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  boatY = height - boatImage.height * 0.1 * boatScale;
}

function mousePressed() {
  showDoves = true;  // Enable the dove animation to start again
  currentFrame = 0;  // Reset the frame index for a fresh start
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




