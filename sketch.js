let mode = 0;
let ripples = [];
let mic;
let splash;
let mySlider;
let sensitivity = 0.02; // 1. 直接在這裡設定固定靈敏度 (數值越小越靈敏)

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  splash = new Splash();
  
  // 2. 依然保留滑桿初始化，但我們不再叫它 show()，它就不會出現
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
    
    // 這裡我們拿掉了 mySlider.show()，所以滑桿會消失
    
    let vol = mic.getLevel();

    // 3. 使用固定的 myThreshold 來偵測聲音
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

    // 4. 這裡原本顯示 Volume 和 Sensitivity 的 text() 已經被我刪除了
    // 現在畫面會保持全黑，只有波紋出現
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