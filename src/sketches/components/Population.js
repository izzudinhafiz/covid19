export class Population {
  constructor(people, sketch) {
    this.p = sketch;
    this.people = people;
    this.infected = this.people.filter((person) => person.infected);
    this.healthy = this.people.filter((person) => !person.infected && !person.recovered);
    this.recovered = this.people.filter((person) => person.recovered);
  }

  update() {
    this.people.forEach((person) => {
      person.update();
    });

    this.infected = this.people.filter((person) => person.infected);
    this.healthy = this.people.filter((person) => !person.infected && !person.recovered);
    this.recovered = this.people.filter((person) => person.recovered);
  }

  show() {
    this.p.push();
    this.p.strokeWeight(this.people[0].size <= 3 ? 3 : this.people[0].size);

    this.p.stroke(255, 255, 255);
    this.healthy.forEach((person) => this.p.point(person.pos));

    this.p.stroke(0, 255, 0);
    this.recovered.forEach((person) => this.p.point(person.pos));

    this.p.stroke(255, 0, 0);
    this.infected.forEach((person) => this.p.point(person.pos));

    this.p.strokeWeight(1);
    this.p.stroke(255, 0, 0);
    this.p.noFill();
    this.infected.forEach((person) => {
      // let blipSize = Math.
      let blipSize = this.p.map(person.counter, 0, person.maxCounter, 0, person.maxRange);
      this.p.circle(person.pos.x, person.pos.y, blipSize);
    });

    this.p.pop();
  }
}
