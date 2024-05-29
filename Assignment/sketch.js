// Class to manage preloading of all images
class ResourceLoader {
  constructor() {
    this.boatImage = null;
    this.birdsImage = null;
    this.doveImages = [];
  }

  preload() {
    this.boatImage = loadImage('assets/transparent_boat.png');
    this.birdsImage = loadImage('assets/birds.png');
    for (let i = 1; i <= 9; i++) {
      this.doveImages.push(loadImage(`assets/doves/dove${i}.png`));
    }
  }
}

// Manage canvas properties and resize, and let the canvas to fit the window
class CanvasManager {
  setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    frameRate(4);  // Higher frame rate for smoother animation
  }

  windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
}

// Draw the background and layered mountains
class BackgroundDrawer {
  draw() {
    background(230, 240, 240);
    this.drawLayeredMountains();
  }

  drawLayeredMountains() {
    let layers = 5;
    let maxHeight = height / 6;
    let noiseScale = 0.01;  // Perlin noise scale
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
}

// Draw water surface
class WaterSurface {
  draw() {
    fill(180, 200, 200, 180);
    rect(0, height - 100, width, 100);
  }
}

// Draw the boat on the water surface
class Boat {
  constructor(boatImage) {
    this.boatImage = boatImage;
    this.boatScale = 0.5;
    this.boatX = 80;
    this.boatY = 0;
  }

  updatePosition() {
    this.boatX += random(1, 5);
    this.boatY += random(-2, 5);
    this.boatX = constrain(this.boatX, 0, width - this.boatImage.width * this.boatScale);
    this.boatY = constrain(this.boatY, height - 100 - this.boatImage.height * this.boatScale, height - this.boatImage.height * this.boatScale);
  }

  draw() {
    this.boatY = height - this.boatImage.height * 0.1 * this.boatScale;
    tint(150, 150, 150, 150);
    image(this.boatImage, this.boatX, this.boatY, this.boatImage.width * this.boatScale, this.boatImage.height * this.boatScale);
    noTint();
  }
}

// Manages the dove and bird flock, positioning them on the canvas
class Overlay {
  constructor(doveImages, birdsImage) {
    this.doveImages = doveImages;
    this.birdsImage = birdsImage;
    this.dovePositions = [
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
    this.showDoves = false;
    this.currentFrame = 0;
  }

  draw() {
    image(this.birdsImage, 1000, 0, 300, 150);
    
    if (this.showDoves) {
      let index = this.currentFrame % this.doveImages.length;
      let pos = this.dovePositions[index];
      image(this.doveImages[index], pos.x, pos.y, pos.width, pos.height);

      if (index === this.doveImages.length - 1 && this.currentFrame >= this.doveImages.length - 1) {
        this.showDoves = false;  // Stop showing doves after one complete cycle
      }
      this.currentFrame++;
    }
  }

  startDoveAnimation() {
    this.showDoves = true;
    this.currentFrame = 0;
  }
}

// Create a film snow effect on the canvas
class FilmEffect {
  draw() {
    // Adding noise
    for (let i = 0; i < 50; i++) {
      fill(255, 255, 255, random(250, 400));
      noStroke();
      ellipse(random(width), random(height), 4, 3);
    }

    // Occasionally flash the screen
    if (random(100) < 1) {  // Adjust frequency
      fill(255, 255, 255, random(100, 300));
      rect(0, 0, width, height);
    }
  }
}

// Main program setup
let resourceLoader = new ResourceLoader();
let canvasManager = new CanvasManager();
let backgroundDrawer = new BackgroundDrawer();
let waterSurface = new WaterSurface();
let boat;
let overlay;
let filmEffect = new FilmEffect();

function preload() {
  resourceLoader.preload();
}

function setup() {
  canvasManager.setup();
  boat = new Boat(resourceLoader.boatImage);
  overlay = new Overlay(resourceLoader.doveImages, resourceLoader.birdsImage);
}

function draw() {
  backgroundDrawer.draw();
  waterSurface.draw();
  boat.updatePosition();
  boat.draw();
  overlay.draw();
  filmEffect.draw();
}

function windowResized() {
  canvasManager.windowResized();
  boat.boatY = height - boat.boatImage.height * 0.1 * boat.boatScale;
}

function mousePressed() {
  overlay.startDoveAnimation();  // Enable dove animation
}
