class Person {
  constructor(sketch) {
    this.p = sketch;
    this.counter = this.p.random(0, 100);
    this.pos = this.p.createVector(this.p.random(0, this.p.width), this.p.random(0, this.p.height));
    this.vel = this.p.createVector(this.p.random(), this.p.random());
    this.size = Math.floor(this.p.width / 100);
  }

  update() {
    this.pos = this.pos.add(this.vel);
    this.counter += 1;

    if (this.pos.x >= this.p.width) {
      this.pos.x = 0;
    }

    if (this.pos.y >= this.p.height) {
      this.pos.y = 0;
    }

    if (this.counter >= 100) {
      this.counter = 0;
    }
  }

  draw() {
    this.p.noStroke();
    this.p.fill(255, 0, 0);
    this.p.ellipse(this.pos.x, this.pos.y, this.size);

    this.p.stroke(255);
    this.p.noFill();
    this.p.ellipse(this.pos.x, this.pos.y, (this.size * this.counter) / 20);
  }
}

export default function sketch(p) {
  let people = [];
  let size;

  p.setup = function () {
    size = Math.floor(Math.min(window.innerWidth * 0.95, window.innerHeight * 0.8));
    console.log(window.innerHeight, window.innerWidth, size);
    p.createCanvas(size, size, p.WEBGL);

    for (let i = 0; i < 100; i++) {
      people.push(new Person(p));
    }
  };

  p.draw = function () {
    p.background(100);
    p.translate(-p.width / 2, -p.height / 2);
    people.forEach((x) => {
      x.update();
      x.draw();
    });
  };
}
