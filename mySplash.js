class Splash {
  constructor() {
    this.splashBorder = 100;


    this.title = createDiv("Acoustic-Ripples");
    this.title.style('color:deeppink');
    this.title.style('font-family: Arial, Helvetica, sans-serif');
    this.title.position(this.splashBorder + 20, this.splashBorder + 20);


    this.name = createDiv("Chin Tung");
    this.name.position(this.splashBorder + 20, this.splashBorder + 60);


   this.info = createDiv("You can read a bunch of stuff about my project here because I've been working very hard in this class and I have so much to say about my project, the way it works, and why I made it. <p> I could go on and on and on. <p> <a href='https://github.com/chinn6689/Acoustic-Ripples' target='_blank'>view code</a>");;
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