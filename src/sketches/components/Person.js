const incubationPeriod = 1000;

export class Person {
  constructor(sketch, infected) {
    this.p = sketch;
    this.counter = this.p.random(0, 100);
    this.pos = this.p.createVector(this.p.random(0, this.p.width), this.p.random(0, this.p.height));
    this.vel = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1));
    this.radius = Math.floor(this.p.width / 100) / 2;
    this.size = this.radius * 2; //diameter
    this.maxCounter = 100;
    this.maxRange = this.radius * 8;
    this.probabilityInfected = 0.05;
    this.infected = infected || false;
    this.infectedCounter = 0;
    this.recovered = false;
  }

  edge() {
    if (this.pos.x <= 0 || this.pos.x >= this.p.width) {
      this.vel.x *= -1;
    } else if (this.pos.y <= 0 || this.pos.y >= this.p.height) {
      this.vel.y *= -1;
    }
  }

  isClose(other) {
    if (this.infected && this !== other) {
      let distance = this.distSquare(this.pos, other.pos);
      if (distance <= this.maxRange) {
        if (this.p.random(0, 1) <= this.probabilityInfected / 10) {
          other.infect();
        }
      }
    }
  }

  infect() {
    if (!this.recovered) {
      this.infected = true;
    }

    return this.infected;
  }

  distSquare(a, b) {
    let deltaX = a.x - b.x;
    let deltaY = a.y - b.y;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  update() {
    this.vel.x += ((Math.random() - 0.5) * this.radius) / 5;
    this.vel.y += ((Math.random() - 0.5) * this.radius) / 5;
    this.vel.limit(this.radius * 0.75);
    this.edge();

    this.pos = this.pos.add(this.vel);

    this.counter += 1;
    if (this.counter >= this.maxCounter) {
      this.counter = 0;
    }
    if (this.infected) {
      this.infectedCounter += 1;
      if (this.infectedCounter >= incubationPeriod) {
        this.infected = false;
        this.recovered = true;
      }
    }
  }

  show() {
    this.p.push();
    this.p.strokeWeight(this.size / 2);
    if (!this.infected) {
      this.p.stroke(255, 255, 255, 200);
    } else if (this.infected) {
      this.p.stroke(255, 0, 0, 200);
    } else if (this.recovered) {
      this.p.stroke(0, 255, 0, 200);
    }
    this.p.point(this.pos);
    this.p.pop();

    if (this.infected) {
      this.p.stroke(255, 0, 0, 150);
      this.p.noFill();
      let blipSize = this.p.map(this.counter, 0, this.maxCounter, 0, this.maxRange);
      this.p.ellipse(this.pos.x, this.pos.y, blipSize);
    }
  }
}
