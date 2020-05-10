export class Circle {
  constructor(x, y, diameter, sketch) {
    this.p = sketch;
    this.pos = this.p.createVector(x, y);
    this.radius = diameter / 2;
    this.diameter = diameter;
  }

  contains(point) {
    return Math.sqrt((point.pos.x - this.pos.x) ** 2 + (point.pos.y - this.pos.y) ** 2) <= this.radius;
  }

  intersects(other) {
    if (other instanceof Rectangle) {
      let distanceX = Math.abs(this.pos.x - other.pos.x);
      let distanceY = Math.abs(this.pos.y - other.pos.y);

      if (distanceX > other.width / 2 + this.radius) return false;
      if (distanceY > other.height / 2 + this.radius) return false;

      if (distanceX < other.width / 2) return true;
      if (distanceY < other.height / 2) return true;

      return (distanceX - other.width / 2) ** 2 + (distanceY - other.height / 2) ** 2 <= this.radius ** 2;
    } else if (other instanceof Circle) {
      let distance = Math.sqrt((other.pos.x - this.pos.x) ** 2 + (other.pos.y - this.pos.y) ** 2);

      return distance <= other.radius + this.radius;
    }
  }

  show() {
    this.p.push();
    this.p.noFill();
    this.p.stroke(255);
    this.p.circle(this.pos.x, this.pos.y, this.diameter);
    this.p.pop();
  }
}

export class Rectangle {
  constructor(x, y, width, sketch) {
    this.p = sketch;
    this.pos = this.p.createVector(x, y);
    this.width = width;
    this.height = width;
    this.x1 = this.pos.x - this.width / 2; //top left corner
    this.y1 = this.pos.y - this.height / 2; //top left corner
    this.x2 = this.pos.x + this.width / 2; //bottom right corner
    this.y2 = this.pos.y + this.height / 2; //bottom right corner
  }

  contains(point) {
    return point.pos.x <= this.x2 && point.pos.x >= this.x1 && point.pos.y <= this.y2 && point.pos.y >= this.y1;
  }

  intersects(other) {
    if (other instanceof Rectangle) {
      //If any Rectangle is completely to the left of the other
      if (this.x1 >= other.x2 || other.x1 >= this.x2) return false;
      //If any Rectangle is completely above the other
      if (this.y1 >= other.y2 || other.y1 >= this.y2) return false;
    } else if (other instanceof Circle) {
      let distanceX = Math.abs(this.pos.x - other.pos.x);
      let distanceY = Math.abs(this.pos.y - other.pos.y);

      if (distanceX > this.width / 2 + other.radius) return false;
      if (distanceY > this.height / 2 + other.radius) return false;

      if (distanceX < this.width / 2) return true;
      if (distanceY < this.height / 2) return true;

      return (distanceX - this.width / 2) ** 2 + (distanceY - this.height / 2) ** 2 <= other.radius ** 2;
    }

    return true;
  }

  show() {
    this.p.push();
    this.p.noFill();
    this.p.stroke(255);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(this.pos.x, this.pos.y, this.width, this.height);
    this.p.pop();
  }
}

export class QuadTree {
  constructor(boundary, capacity, sketch) {
    this.p = sketch;
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.childrens = [];
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity && this.childrens.length === 0) {
      this.points.push(point);
      return true;
    }

    if (this.childrens.length === 0) {
      this.subdivide();
    }

    if (this.childrens[0].insert(point)) return true;
    if (this.childrens[1].insert(point)) return true;
    if (this.childrens[2].insert(point)) return true;
    if (this.childrens[3].insert(point)) return true;

    return false;
  }

  subdivide() {
    if (this.childrens.length !== 0) return false;

    const x = this.boundary.pos.x;
    const y = this.boundary.pos.y;
    const xOffset = this.boundary.width / 4;
    const yOffset = this.boundary.height / 4;

    this.childrens.push(new QuadTree(new Rectangle(x + xOffset, y - yOffset, xOffset * 2, this.p), this.capacity, this.p)); //NE
    this.childrens.push(new QuadTree(new Rectangle(x + xOffset, y + yOffset, xOffset * 2, this.p), this.capacity, this.p)); //SE
    this.childrens.push(new QuadTree(new Rectangle(x - xOffset, y + yOffset, xOffset * 2, this.p), this.capacity, this.p)); //SW
    this.childrens.push(new QuadTree(new Rectangle(x - xOffset, y - yOffset, xOffset * 2, this.p), this.capacity, this.p)); //NW

    return true;
  }

  query(range) {
    let foundPoints = [];

    if (!this.boundary.intersects(range)) {
      return foundPoints;
    }

    this.points.forEach((point) => {
      if (range.contains(point)) {
        foundPoints.push(point);
      }
    });

    if (this.childrens.length === 0) {
      return foundPoints;
    }

    this.childrens.forEach((child) => {
      let temp = child.query(range);
      temp.forEach((tempPoint) => foundPoints.push(tempPoint));
    });

    return foundPoints;
  }

  show() {
    if (this.childrens.length === 0) {
      this.boundary.show();
      return true;
    }

    this.childrens.forEach((child) => {
      child.show();
    });

    return false;
  }
}
