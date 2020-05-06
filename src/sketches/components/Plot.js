class linePlot {
  constructor(sketch) {
    this.p = sketch;
    this.count = 0;
    this.offset = 10;
    this.plotHeight = this.p.height - this.offset * 2;
    this.plotWidth = this.p.width - this.offset * 2;
  }

  show() {
    const p = this.p;
    p.fill(255);
    p.stroke(255);
    p.translate(this.offset, p.height - this.offset);
    p.scale(1, -1);
    p.line(0, 0, 0, this.plotHeight);
    p.line(0, 0, this.plotWidth, 0);
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
    p.background(0);
    plot.show();
  };
}
