class Ray {
	constructor(pos, angle) {
		this.pos = pos;
		this.dir = p5.Vector.fromAngle(angle);
	}

	show() {
		stroke(255);
		push();
		translate(this.pos.x, this.pos.y);
		line(0, 0, this.dir.x * 30, this.dir.y * 30);
		pop();	
	}

	getPt(walls, dir) {
		this.dir.rotate(dir);

		let record = Infinity;
		let closestPt;

		for (let wall of walls) {
			let pt = this.cast(wall);
			if (pt) {
				let ptDist = dist(this.pos.x, this.pos.y, pt.x, pt.y)
				if (ptDist < record) {
					record = ptDist;
					closestPt = pt
				}
			}
		}

		if (closestPt) {
			this.dir.rotate(-dir);
			return closestPt;
		}

		this.dir.rotate(-dir);
	}

	look(walls, dir) {
		this.dir.rotate(dir);

		let record = Infinity;
		let closestPt;

		for (let wall of walls) {
			let pt = this.cast(wall);
			if (pt) {
				let ptDist = dist(this.pos.x, this.pos.y, pt.x, pt.y)
				if (ptDist < record) {
					record = ptDist;
					closestPt = pt
				}
			}
		}

		if (closestPt) {
			noStroke();
			fill(50, 255, 50);
			if (this.pos.dist(closestPt) < 50) {
				fill(255, 50, 50);
				// beepSound.play();
			}
			circle(closestPt.x, closestPt.y, 10);
			stroke(255);
			line(this.pos.x, this.pos.y, closestPt.x, closestPt.y);
		}
		
		this.dir.rotate(-dir);
	}

	cast(wall) {
		const x1 = wall.a.x;
		const y1 = wall.a.y;
		const x2 = wall.b.x;
		const y2 = wall.b.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x;
		const y4 = this.pos.y + this.dir.y;

		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (den == 0) {
			return;
		}

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;

		if (t > 0 && t < 1 && u > 0) {
			let pt = createVector();
			pt.x = x1 + t * (x2 - x1);
			pt.y = y1 + t * (y2 - y1);
			return pt;
		} else {
			return;
		}
	}
}