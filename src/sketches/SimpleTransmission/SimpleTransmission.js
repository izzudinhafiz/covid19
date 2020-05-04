import { Rectangle, QuadTree } from "../components/QuadTree";
import { Person } from "../components/Person";
import { Population } from "../components/Population";

export default function SimpleTransmission(p) {
  let people = [];
  let population;
  let size;
  let qtree;

  p.disableFriendlyErrors = true;

  p.setup = function () {
    size = Math.floor(Math.min(window.innerWidth * 0.95, 400));
    p.createCanvas(size, size);

    for (let i = 0; i < 200; i++) {
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
  };
}
