let mode = 0;
let ripples = [];
let mic;
let splash;
let mySlider;
let sensitivity = 0.02;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  splash = new Splash();
  
  mySlider = createSlider(0, 1, 0.1, 0.01);
  mySlider.hide(); 

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  if (mode === 0) {
    background(220);
    splash.show();
    
    if (splash.update() === true) {
      splash.hide();
      mode = 1;
      userStartAudio(); 
    }
  } 
  else if (mode === 1) {
    background(10, 20, 40);
    
    let vol = mic.getLevel();

    if (vol > sensitivity) {
      ripples.push(new Ripple(random(width), random(height)));
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].update();
      ripples[i].display();
      if (ripples[i].isDead()) {
        ripples.splice(i, 1);
      }
    }

  }
}

function mousePressed() {
  if (mode === 1) {
    ripples.push(new Ripple(mouseX, mouseY));
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;   
    this.transparency = 255;   
    this.growth = 2.5;
    this.red = random(100, 255);
    this.green = random(150, 255);
    this.blue = random(200, 255);
  }
  update() {
    this.r += this.growth; 
    this.transparency -= 3;     
  }
  display() {
    noFill();
    stroke(this.red, this.green, this.blue, this.transparency); 
    strokeWeight(2);
    ellipse(this.x, this.y, this.r);
  }
  isDead() {
    return this.transparency <= 0;
  }
}
