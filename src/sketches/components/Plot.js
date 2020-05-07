import { Recovered, Infected, Healthy } from "./Color";

const factors = (number) => [...Array(number + 1).keys()].filter((i) => number % i === 0);

class linePlot {
  constructor(sketch) {
    this.p = sketch;
    this.offset = 10;
    this.plotHeight = this.p.height - this.offset * 2;
    this.plotWidth = this.p.width - this.offset * 2;
    let factorsArr = factors(this.plotWidth).filter((x) => x <= this.p.width);
    this.scaleFactor = factorsArr[factorsArr.length - 1];
    this.plotBar = this.plotWidth / this.scaleFactor;
  }

  plot(array, maxCount) {
    let healthy = array.map((x) => x.healthy);
    let infected = array.map((x) => x.infected);
    let recovered = array.map((x) => x.recovered);
    const p = this.p;

    let modifiedHealthy = [];
    let modifiedRecovered = [];
    let modifiedInfected = [];

    for (let x = 0; x < this.scaleFactor; x++) {
      modifiedHealthy.push([]);
      modifiedInfected.push([]);
      modifiedRecovered.push([]);
    }

    const stepSize = healthy.length / this.scaleFactor;

    for (let i = 0; i < modifiedHealthy.length; i++) {
      modifiedHealthy[i] = healthy[Math.floor(i * stepSize)];
      modifiedInfected[i] = infected[Math.floor(i * stepSize)];
      modifiedRecovered[i] = recovered[Math.floor(i * stepSize)];
    }

    p.push();
    p.translate(this.offset + 1, p.height - this.offset - 1);
    p.scale(1, -1);
    p.noStroke();
    for (let i = 0; i < modifiedHealthy.length - 1; i++) {
      let x1 = i * this.plotBar;
      let x2 = i * this.plotBar + this.plotBar;

      let i1 = modifiedInfected[i];
      let i2 = modifiedInfected[i + 1];
      let h1 = modifiedHealthy[i] + i1;
      let h2 = modifiedHealthy[i + 1] + i2;
      let r1 = modifiedRecovered[i] + h1;
      let r2 = modifiedRecovered[i + 1] + h2;

      let multiplier = (this.plotHeight * 0.9) / maxCount;
      p.fill(Recovered.r, Recovered.g, Recovered.b);
      p.stroke(Recovered.r, Recovered.g, Recovered.b);
      p.quad(x1, 0, x2, 0, x2, r2 * multiplier, x1, r1 * multiplier);
      p.fill(Healthy.r, Healthy.g, Healthy.b);
      p.stroke(Healthy.r, Healthy.g, Healthy.b);
      p.quad(x1, 0, x2, 0, x2, h2 * multiplier, x1, h1 * multiplier);
      p.fill(Infected.r, Infected.g, Infected.b);
      p.stroke(Infected.r, Infected.g, Infected.b);
      p.quad(x1, 0, x2, 0, x2, i2 * multiplier, x1, i1 * multiplier);
    }

    p.pop();
  }

  show() {
    const p = this.p;
    p.push();
    p.fill(0);
    p.stroke(0);
    p.translate(this.offset, p.height - this.offset);
    p.scale(1, -1);
    p.line(0, 0, 0, this.plotHeight);
    p.line(0, 0, this.plotWidth, 0);

    p.pop();
  }
}

export default function Plot(p) {
  let size;
  let data;
  let plot;

  p.disableFriendlyErrors = true;

  p.PropsHandler = function (props) {
    data = props.data;
  };

  p.setup = function () {
    size = Math.floor(Math.min(p.windowWidth * 0.92, 400));
    p.createCanvas(size, size / 3);
    plot = new linePlot(p);
  };

  p.draw = function () {
    let infected = data.map((x) => x.infected);
    p.background(255);
    plot.show();
    plot.plot(data, 500);

    if (infected[infected.length - 1] === 0) {
      p.noLoop();
    }
  };
}
