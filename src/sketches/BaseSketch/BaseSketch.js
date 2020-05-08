import { Rectangle, QuadTree } from "../components/QuadTree";
import { Person } from "../components/Person";
import { Population } from "../components/Population";
import { Recovered, Infected, Healthy } from "../components/Color";

export default function SimpleTransmission(p) {
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
      people.push(new Person(p));
    }
    people.push(new Person(p, true));
    population = new Population(people, p);
    population.updateCount();

    updateData(population);
  };

  p.draw = function () {
    p.background(255);
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width, p.height);

    qtree = new QuadTree(new Rectangle(p.width / 2, p.height / 2, p.width, p), 4, p);

    population.healthy.forEach((person) => qtree.insert(person));

    population.infected.forEach((person) => {
      let boundingBox = new Rectangle(person.pos.x, person.pos.y, person.maxRange, p);
      let neighbours = qtree.query(boundingBox);

      if (neighbours.length !== 0) {
        neighbours.forEach((neighbour) => {
          if (person.isClose(neighbour)) {
            neighbour.infect();
          }
        });
      }
    });
    population.updatePeople();

    if (population.infected > 0) {
      population.updateCount();
      updateData(population);
    }
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

    // if (p.frameCount % 20 === 0) {
    //   updateData(population);
    // }
  };
}
