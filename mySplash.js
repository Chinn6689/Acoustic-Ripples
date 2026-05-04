class Splash {
  constructor() {
    this.splashBorder = 100;


    this.title = createDiv("Acoustic-Ripples");
    this.title.style('color:deeppink');
    this.title.style('font-family: Arial, Helvetica, sans-serif');
    this.title.position(this.splashBorder + 20, this.splashBorder + 20);


    this.name = createDiv("Chin Tung");
    this.name.position(this.splashBorder + 20, this.splashBorder + 60);

    this.info = createDiv("<strong>Acoustic Ripples</strong> is an interactive audiovisual installation that transforms sound into liquid geometry. By using a microphone to capture environmental noise or playing the digital piano (keys 1-7), users can generate vibrant, pulsating ripples on a dark, meditative surface. <p> <strong>Instructions:</strong> <br> • Speak or play music to trigger ripples. <br> • Press keys 1-7 to play notes (Do-Si). <br> • Click mouse to interact. <p> <a href='https://github.com/chinn6689/Acoustic-Ripples' target='_blank'>view code</a>");
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
