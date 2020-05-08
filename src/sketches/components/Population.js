import { Recovered, Infected, Healthy } from "./Color";

export class Population {
  constructor(people, sketch) {
    this.p = sketch;
    this.people = people;
    this.infected = this.people.filter((person) => person.infected);
    this.healthy = this.people.filter((person) => !person.infected && !person.recovered);
    this.recovered = this.people.filter((person) => person.recovered);
  }

  updatePeople() {
    this.people.forEach((person) => {
      person.updateVelocity();
      person.updateState();
    });
  }

  updateCount() {
    this.infected = this.people.filter((person) => person.infected);
    this.healthy = this.people.filter((person) => !person.infected && !person.recovered);
    this.recovered = this.people.filter((person) => person.recovered);
  }

  show() {
    this.p.push();
    this.p.strokeWeight(this.people[0].size <= 3 ? 3 : this.people[0].size);

    this.p.stroke(Healthy.r, Healthy.g, Healthy.b);
    this.healthy.forEach((person) => this.p.point(person.pos));

    this.p.stroke(Recovered.r, Recovered.g, Recovered.b);
    this.recovered.forEach((person) => this.p.point(person.pos));

    this.p.stroke(Infected.r, Infected.g, Infected.b);
    this.infected.forEach((person) => this.p.point(person.pos));

    this.p.strokeWeight(1);
    this.p.stroke(Infected.r, Infected.g, Infected.b);
    this.p.noFill();
    this.infected.forEach((person) => {
      // let blipSize = Math.
      let blipSize = this.p.map(person.counter, 0, person.maxCounter, 0, person.maxRange);
      this.p.circle(person.pos.x, person.pos.y, blipSize);
    });

    this.p.pop();
  }
}
