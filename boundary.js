class Boundary {
	constructor(x1, y1, x2, y2) {
		if (y1 < y2) {
			this.a = createVector(x1, y1);
			this.b = createVector(x2, y2);
		} else {
			this.b = createVector(x1, y1);
			this.a = createVector(x2, y2);
		}
	}

	show() {
		stroke(255, 0, 0);
		strokeWeight(5);
		point(this.a);
		stroke(0);
		strokeWeight(3);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}

	getDirVec() {
		return this.b.copy().sub(this.a).rotate(HALF_PI);
	}
}