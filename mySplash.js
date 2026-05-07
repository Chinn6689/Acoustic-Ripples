class Splash {
  constructor() {
    this.splashBorder = 100;


    this.title = createDiv("Acoustic-Ripples");
    this.title.style('color:deeppink');
    this.title.style('font-family: Arial, Helvetica, sans-serif');
    this.title.position(this.splashBorder + 20, this.splashBorder + 20);


    this.name = createDiv("Chin Tung");
    this.name.position(this.splashBorder + 20, this.splashBorder + 60);

    this.info = createDiv("Acoustic Ripples is an interactive installation that transforms sound into liquid geometry. Using FFT analysis, the system maps environmental sound to ripple size. Additionally, it features a built-in Oscillator, allowing you to play the screen like a digital piano using keys 1-7. By blending real-time audio sensing with active sound synthesis, the project creates a seamless, meditative bridge between what we hear and what we see. <p> <a href='https://editor.p5js.org/chinn6689/sketches/pJfU77LjH' target='_blank'>view code</a>");
 
    this.info.position(this.splashBorder + 20, this.splashBorder + 100);
    this.info.size(windowWidth - this.splashBorder * 2 - 50, windowHeight - this.splashBorder * 2 - 50);
  }

  show() {

    fill(255);
    stroke(255, 0, 0);
    strokeWeight(1);
    rect(this.splashBorder, this.splashBorder, windowWidth - this.splashBorder * 2, windowHeight - this.splashBorder * 2);


    fill(0, 0, 222);
    strokeWeight(3);
    stroke(0, 0, 222);

    line(windowWidth - this.splashBorder - 40, this.splashBorder + 20, windowWidth - this.splashBorder - 20, this.splashBorder + 40);

    line(windowWidth - this.splashBorder - 20, this.splashBorder + 20, windowWidth - this.splashBorder - 40, this.splashBorder + 40);
  }

  update() {

    if (mouseIsPressed) {
      if (mouseX > windowWidth - this.splashBorder - 40 &&
        mouseX < windowWidth - this.splashBorder - 20 &&
        mouseY < this.splashBorder + 40 &&
        mouseY > this.splashBorder + 20) {
        return true;
      }
    }
    return false;
  }

  hide() {

    this.title.remove();
    this.name.remove();
    this.info.remove();
  }
}
