let mode = 0;
let ripples = [];
let mic, splash, osc, env, fft; 
let myThreshold = 0.05; // 提高靈敏度

let notes = {
  '1': 261.63, '2': 293.66, '3': 329.63, '4': 349.23, 
  '5': 392.00, '6': 440.00, '7': 493.88
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  splash = new Splash();
  
  mic = new p5.AudioIn();
  mic.start();

  // 初始化 FFT (快速傅立葉變換) 用來偵測音高
  fft = new p5.FFT();
  fft.setInput(mic);

  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 0.5);
  env.setRange(0.8, 0);

  osc = new p5.Oscillator('sine');
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
    
    // 1. 分析聲音頻譜
    fft.analyze();
    let pitch = fft.getCentroid(); // 獲取重心頻率 (音高)
    let vol = mic.getLevel();

    // 2. 麥克風感應產生波紋
    if (vol > 0.04) {
      // 傳入 pitch 到 Ripple 類別
      ripples.push(new Ripple(random(width), random(height), pitch));
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

function keyPressed() {
  if (mode === 1 && notes[key]) {
    osc.freq(notes[key]);
    env.play();
    // 鍵盤按鍵也會根據設定的頻率產生不同大小的波紋
    ripples.push(new Ripple(random(width), random(height), notes[key]));
  }
}

function mousePressed() {
  if (mode === 1) {
    ripples.push(new Ripple(mouseX, mouseY, 1000)); // 滑鼠點擊給予預設中頻音高
  }
}

// --- 修改後的 Ripple 類別 ---
class Ripple {
  constructor(x, y, pitch) {
    this.x = x;
    this.y = y;
    this.r = 0;   
    this.transparency = 255;    
    
    // ✨ 關鍵邏輯：音越高 (pitch大)，成長速度 (growth) 越小
    // 使用 map 函式：當音高在 500~5000Hz 之間時，速度在 5.0~1.0 之間變化
    this.growth = map(pitch, 500, 5000, 12.0, 3.0);
    // 限制生長速度不低於 0.5，不超過 8.0
    this.growth = constrain(this.growth, 1.0, 15.0);

    this.red = random(100, 255);
    this.green = random(150, 255);
    this.blue = random(200, 255);
  }
  update() {
    this.r += this.growth; 
    this.transparency -= 2;     
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
