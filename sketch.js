let mode = 0;
let ripples = [];
let mic;
let splash;
let osc; // 振盪器
let env; // 聲音信封（讓聲音有漸強漸弱，不會刺耳）
let myThreshold = 0.1;

// 定義 1-7 的頻率 (Do, Re, Mi, Fa, Sol, La, Si)
let notes = {
  '1': 261.63, // C4
  '2': 293.66, // D4
  '3': 329.63, // E4
  '4': 349.23, // F4
  '5': 392.00, // G4
  '6': 440.00, // A4
  '7': 493.88  // B4
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  splash = new Splash();
  
  // 初始化麥克風
  mic = new p5.AudioIn();
  mic.start();

  // --- 音訊合成器設定 ---
  // 設定信封 (ADSR): 攻擊時間, 衰減時間, 延音音量, 釋放時間
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 0.5);
  env.setRange(0.8, 0); // 最大音量 0.8, 最小 0

  // 設定振盪器
  osc = new p5.Oscillator('sine'); // 使用正弦波，聲音比較柔和
  osc.amp(env);
  osc.start();
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
    if (vol > myThreshold) {
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

// --- 新增：按鍵發聲與產生波紋 ---
function keyPressed() {
  if (mode === 1) {
    // 檢查按下的鍵是否在我們的筆記表裡
    if (notes[key]) {
      // 1. 設定頻率
      osc.freq(notes[key]);
      // 2. 觸發聲音 (發出聲音)
      env.play();
      // 3. 在畫面上隨機位置產生一個波紋（代表這個聲音）
      ripples.push(new Ripple(random(width), random(height)));
    }
  }
}

function mousePressed() {
  if (mode === 1) {
    ripples.push(new Ripple(mouseX, mouseY));
  }
}

// Ripple 類別保持不變...
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
