export class Person {
  constructor(sketch, infected, range, probability) {
    this.p = sketch;
    this.counter = this.p.random(0, 100);
    this.radius = this.p.width / 100 / 2;
    this.size = this.radius * 2; //diameter
    this.pos = this.p.createVector(this.p.random(0, this.p.width), this.p.random(0, this.p.height));
    this.vel = this.p.createVector(this.p.random(-this.radius, this.radius), this.p.random(-this.radius, this.radius));
    this.vel.mult(0.4);
    this.maxCounter = 100;
    this.maxRange = range || this.radius * 10;
    this.probabilityConstant = 0.0018 * this.maxRange * this.maxRange - 0.123 * this.maxRange + 2.14;
    this.probabilityInfected = probability || 0.02;
    this.infected = infected || false;
    this.infectedCounter = 0;
    this.recovered = false;
    this.incubationPeriod = 500;
  }

  edge() {
    if (this.pos.x <= 0 || this.pos.x >= this.p.width) {
      this.vel.x *= -1;
    } else if (this.pos.y <= 0 || this.pos.y >= this.p.height) {
      this.vel.y *= -1;
    }
  }

  isClose(other) {
    if (this === other) return false;
    let distance = this.distSquare(this.pos, other.pos);
    if (distance <= this.maxRange) {
      return true;
    }

    return false;
  }

  infect(other) {
    let distance = this.distSquare(this.pos, other.pos);
    let probability = 1 / (1 + this.probabilityConstant * distance * distance);

    if (Math.random() <= probability) {
      if (!other.recovered) {
        other.infected = true;
      }
      return other.infected;
    }
  }

  // infect(other) {
  //   if (Math.random() <= other.probabilityInfected) {
  //     if (!other.recovered) {
  //       other.infected = true;
  //     }
  //   }

  //   return other.infected;
  // }

  distSquare(a, b) {
    let deltaX = a.x - b.x;
    let deltaY = a.y - b.y;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  updateVelocity() {
    this.vel.rotate(this.p.radians(this.p.random(-10, 10)));
    this.edge();
  }

  updateState() {
    this.pos = this.pos.add(this.vel);

    this.counter += 1;
    if (this.counter >= this.maxCounter) {
      this.counter = 0;
    }
    if (this.infected) {
      this.infectedCounter += 1;
      if (this.infectedCounter >= this.incubationPeriod) {
        this.infected = false;
        this.recovered = true;
      }
    }
  }

  show() {
    this.p.push();
    this.p.strokeWeight(this.size / 2);
    if (!this.infected) {
      this.p.stroke(93, 183, 164);
    } else if (this.infected) {
      this.p.stroke(193, 54, 63);
    } else if (this.recovered) {
      this.p.stroke(153, 210, 140);
    }
    this.p.point(this.pos);
    this.p.pop();

    if (this.infected) {
      this.p.stroke(193, 54, 63);
      this.p.noFill();
      // let blipSize = this.p.map(this.counter, 0, this.maxCounter, 0, this.maxRange * 2);
      this.p.circle(this.pos.x, this.pos.y, this.maxRange);
    }
  }
}
