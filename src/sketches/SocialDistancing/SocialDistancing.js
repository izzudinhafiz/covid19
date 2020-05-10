import { Rectangle, QuadTree, Circle } from "../components/QuadTree";
import { Person } from "../components/Person";
import { Population } from "../components/Population";
import { Recovered, Infected, Healthy } from "../components/Color";

class DistancingPerson extends Person {
  constructor(sketch, infected, range, probability) {
    super(sketch, infected, range, probability);
    this.distancingFlag = false;
    this.deltaVel = this.p.createVector();
    this.seperationRange = this.size * 5.5;
  }

  seperation(agents) {
    let neighbourCount = 0;
    let velocity = this.p.createVector(0, 0);
    if (agents) {
      agents.forEach((agent) => {
        if (this.isClose(agent)) {
          velocity.x += agent.pos.x - this.pos.x;
          velocity.y += agent.pos.y - this.pos.y;
          neighbourCount++;
        }
      });
    }

    if (neighbourCount !== 0) {
      velocity.x /= neighbourCount;
      velocity.y /= neighbourCount;
    }

    velocity.x *= -1;
    velocity.y *= -1;
    velocity = velocity.normalize();

    this.deltaVel = velocity;
  }

  updateVelocity() {
    if (this.distancingFlag) {
      this.vel.x += this.deltaVel.x;
      this.vel.y += this.deltaVel.y;
      // this.vel.normalize();
      this.vel.limit(this.radius * 0.5);
    } else {
      this.vel.rotate(this.p.radians(this.p.random(-10, 10)));
    }
    this.edge();
  }
}

export default function SocialDistancing(p) {
  let people = [];
  let population;
  let size;
  let qtree;
  let data;
  let updateState;

  p.disableFriendlyErrors = true;

  function updateData(population) {
    if (data) {
      updateState([
        ...data,
        {
          healthy: population.healthy.length,
          infected: population.infected.length,
          recovered: population.recovered.length
        }
      ]);
    }
  }

  p.PropsHandler = function (props) {
    data = props.data;
    updateState = props.updateData;
  };

  p.setup = function () {
    size = Math.floor(Math.min(p.windowWidth * 0.92, 400));
    p.createCanvas(size, size);
    p.randomSeed(92);
    for (let i = 1; i < 500; i++) {
      people.push(new DistancingPerson(p, false));
    }
    people.push(new DistancingPerson(p, true));
    population = new Population(people, p);
    population.updateCount();

    updateData(population);
  };

  p.draw = function () {
    p.background(255);
    p.stroke(0);
    p.strokeWeight(1);
    p.noFill();
    p.rect(0, 0, p.width, p.height);

    qtree = new QuadTree(new Rectangle(p.width / 2, p.height / 2, p.width, p), 4, p);

    population.people.forEach((person) => qtree.insert(person));

    population.people.forEach((person) => {
      if (!person.distancingFlag && population.infected.length >= 200) {
        person.distancingFlag = true;
      } else if (person.distancingFlag && population.infected.length <= 0) {
        person.distancingFlag = false;
        person.vel = p.createVector(p.random(-person.radius, person.radius), p.random(-person.radius, person.radius));
        person.vel.mult(0.4);
      }
      let boundingBox = new Circle(person.pos.x, person.pos.y, person.seperationRange, p);
      let neighbours = qtree.query(boundingBox);
      person.seperation(neighbours);

      boundingBox = new Circle(person.pos.x, person.pos.y, person.maxRange, p);
      neighbours = qtree.query(boundingBox);

      if (person.infected) {
        if (neighbours.length !== 0) {
          neighbours.forEach((neighbour) => {
            person.infect(neighbour);
          });
        }
      }
    });

    population.updatePeople();

    population.updateCount();
    updateData(population);
    population.show();

    p.push();
    const xc = Math.floor(p.width * 0.01);
    const yc = Math.floor(p.height * 0.01);
    const fontSize = Math.floor(p.height * 0.03);
    const yOffset = Math.floor(fontSize * 1.3);
    const xOffset = fontSize * 3;
    const pointSize = Math.floor(fontSize * 0.75);
    p.fill(200, 200, 200, 200);
    p.rect(xc, yc, fontSize * 10, yOffset * 3.5, p.width * 0.01);

    p.fill(0);
    p.strokeWeight(0.4);
    p.textSize(fontSize);
    p.text("Susceptible", xc + xOffset, yc + yOffset);
    p.text("Infectious", xc + xOffset, yc + yOffset * 2);
    p.text("Recovered", xc + xOffset, yc + yOffset * 3);

    p.strokeWeight(pointSize);
    p.stroke(Healthy.r, Healthy.g, Healthy.b);
    p.point(xc + xOffset / 2, yc + yOffset - pointSize / 2);
    p.stroke(Infected.r, Infected.g, Infected.b);
    p.point(xc + xOffset / 2, yc + yOffset * 2 - pointSize / 2);
    p.stroke(Recovered.r, Recovered.g, Recovered.b);
    p.point(xc + xOffset / 2, yc + yOffset * 3 - pointSize / 2);
    p.pop();
  };
}
