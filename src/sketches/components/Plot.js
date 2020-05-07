class linePlot {
  constructor(sketch) {
    this.p = sketch;
    this.count = 0;
    this.offset = 10;
    this.plotHeight = this.p.height - this.offset * 2;
    this.plotWidth = this.p.width - this.offset * 2;
    this.plotBar = this.plotWidth / 100;
  }

  plot(array, maxCount, color) {
    const p = this.p;
    const data = array;
    let y1, y2;
    let modifiedData = [];

    for (let x = 0; x < 100; x++) {
      modifiedData.push([]);
    }

    const stepSize = data.length / 100;

    for (let i = 0; i < modifiedData.length; i++) {
      modifiedData[i] = data[Math.floor(i * stepSize)];
    }

    p.push();
    p.translate(this.offset, p.height - this.offset);
    p.scale(1, -1);
    if (color === "white") {
      p.fill(255);
      p.stroke(255);
    } else if (color === "red") {
      p.fill(255, 0, 0);
      p.stroke(255, 0, 0);
    } else if (color === "green") {
      p.fill(0, 255, 0);
      p.stroke(0, 255, 0);
    }

    // modifiedData = modifiedData.filter((x) => x);
    for (let i = 0; i < modifiedData.length - 1; i++) {
      y1 = (modifiedData[i] / maxCount) * (this.plotHeight * 0.9);
      y2 = (modifiedData[i + 1] / maxCount) * (this.plotHeight * 0.9);

      p.quad(i * this.plotBar, 0, i * this.plotBar + this.plotBar, 0, i * this.plotBar + this.plotBar, y2, i * this.plotBar, y1);
    }

    p.pop();
  }

  show() {
    const p = this.p;
    p.push();
    p.fill(255);
    p.stroke(255);
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
    // p.frameRate(5);
    size = Math.floor(Math.min(p.windowWidth * 0.92, 400));
    p.createCanvas(size, size / 3);
    plot = new linePlot(p);
  };

  p.draw = function () {
    let healthy = data.map((x) => x.healthy);
    let infected = data.map((x) => x.infected);
    let recovered = data.map((x) => x.recovered);
    p.background(0);
    plot.show();
    plot.plot(healthy, 500, "white");
    plot.plot(infected, 500, "red");

    if (infected[infected.length - 1] === 0) {
      p.noLoop();
    }
  };
}
