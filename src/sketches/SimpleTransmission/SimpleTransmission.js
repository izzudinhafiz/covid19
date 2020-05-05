import { Rectangle, QuadTree } from "../components/QuadTree";
import { Person } from "../components/Person";
import { Population } from "../components/Population";

export default function SimpleTransmission(p) {
  let people = [];
  let population;
  let size;
  let qtree;

  p.disableFriendlyErrors = true;

  p.PropsHandler = function (props) {};

  p.setup = function () {
    size = Math.floor(Math.min(p.windowWidth * 0.92, 400));
    p.createCanvas(size, size);
    for (let i = 0; i < 500; i++) {
      people.push(new Person(p));
    }
    people.push(new Person(p, true));
    population = new Population(people, p);
  };

  p.draw = function () {
    p.background(150);
    qtree = new QuadTree(new Rectangle(p.width / 2, p.height / 2, p.width, p), 4, p);

    population.healthy.forEach((person) => qtree.insert(person));

    population.infected.forEach((person) => {
      let boundingBox = new Rectangle(person.pos.x, person.pos.y, person.maxRange, p);
      let neighbours = qtree.query(boundingBox);

      if (neighbours.length !== 0) {
        neighbours.forEach((neighbour) => {
          person.isClose(neighbour);
        });
      }
    });

    population.update();
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
    p.textSize(fontSize);
    p.text("Susceptible", xc + xOffset, yc + yOffset);
    p.text("Infectious", xc + xOffset, yc + yOffset * 2);
    p.text("Recovered", xc + xOffset, yc + yOffset * 3);

    p.strokeWeight(pointSize);
    p.stroke(255, 255, 255);
    p.point(xc + xOffset / 2, yc + yOffset - pointSize / 2);
    p.stroke(255, 0, 0);
    p.point(xc + xOffset / 2, yc + yOffset * 2 - pointSize / 2);
    p.stroke(0, 255, 0);
    p.point(xc + xOffset / 2, yc + yOffset * 3 - pointSize / 2);
    p.pop();
  };
}
