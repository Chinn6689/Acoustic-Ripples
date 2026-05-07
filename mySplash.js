class Splash {
  constructor() {
    this.splashBorder = 100;


    this.title = createDiv("Acoustic-Ripples");
    this.title.style('color:deeppink');
    this.title.style('font-family: Arial, Helvetica, sans-serif');
    this.title.position(this.splashBorder + 20, this.splashBorder + 20);


    this.name = createDiv("Chin Tung");
    this.name.position(this.splashBorder + 20, this.splashBorder + 60);

    this.info = createDiv("Acoustic Ripples is an interactive audiovisual installation that transforms sound into liquid geometry. By using a microphone to capture environmental noise or playing the digital piano through keys 1 to 7, you can generate vibrant, pulsating ripples on a dark and meditative surface. This project explores the boundary between the invisible nature of sound and the fluid elegance of water, allowing you to paint with your voice, rhythm, and touch. You can speak to the screen, play your favorite music, or use the keyboard to compose your own visual melody. <p> <a href='https://editor.p5js.org/chinn6689/sketches/pJfU77LjH' target='_blank'>view code</a>");
 
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
