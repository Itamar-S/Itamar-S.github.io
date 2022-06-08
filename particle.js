// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting

class Particle {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.rays = [];
		for (let a = 0; a < 360; a += 5) {
			this.rays.push(new Ray(this.pos, radians(a)));
		}
	}

	update(x, y) {
		this.pos.set(x, y);
	}

	look(walls, outerWalls) {
		for (let wall of walls) {
			let ray1 = new Ray(this.pos, (wall.a.copy().sub(this.pos).heading()));
			let ray2 = new Ray(this.pos, (wall.b.copy().sub(this.pos).heading()));
			let intersection1, wall1;
			let intersection2, wall2;
			for (let i = 0; i < outerWalls.length; i++) {
				let outerWall = outerWalls[i];
				const pt1 = ray1.cast(outerWall);
				if (pt1) {
					intersection1 = pt1;
					wall1 = i;
				}
				const pt2 = ray2.cast(outerWall);
				if (pt2) {
					intersection2 = pt2;
					wall2 = i;
				}
			}
			// stroke(0);
			// strokeWeight(3);
			// line(this.pos.x, this.pos.y, intersection1.x, intersection1.y)
			// line(this.pos.x, this.pos.y, intersection2.x, intersection2.y)
			// stroke(255, 0, 0);
			// strokeWeight(10);
			// point(intersection1);
			// point(intersection2);
			if ((wall1 || wall1 == 0) && (wall2 || wall2 == 0)) {
				if (wall1 > wall2) {
					let temp = wall1;
					wall1 = wall2;
					wall2 = temp;
				}
	
				let side = Math.sign(p5.Vector.dot(wall.getDirVec().normalize(), this.pos.copy().sub(wall.a).normalize()));
				console.log(side);
				
				fill(0, 200);
				noStroke();
				beginShape();
				vertex(wall.a.x, wall.a.y);
				vertex(intersection1.x, intersection1.y);
				if (wall1 != wall2) {
					if (wall1 == 0) {
						if (side == 1) {
							if (wall2 == 1) {
								vertex(width, -1);
							} else if (wall2 == 2) {
								vertex(width, -1);
								vertex(width, height);
							} else if (wall2 == 3) {
								vertex(-1, -1);
							}
						} else {
							if (wall2 == 1) {
								vertex(-1, -1);
								vertex(-1, height);
								vertex(width, height);
							} else if (wall2 == 2) {
								vertex(-1, -1);
								vertex(-1, height);
							} else if (wall2 == 3) {
								vertex(width, -1);
								vertex(width, height);
								vertex(-1, height);
								// vertex(-1, -1);
							}
						}
					} else if (wall1 == 1) {
						if (side == 1) {
							if (wall2 == 2) {
								vertex(width, height);
							} else if (wall2 == 3) {
								vertex(-1, -1);
								vertex(width, -1);
							}
					} else {
							if (wall2 == 2) {
								vertex(width, height);
							} else if (wall2 == 3) {
								// vertex(width, -1);
								// vertex(-1, -1);
								vertex(-1, height);
								vertex(width, height);
							}
					}
					} else if (wall1 == 2) {
						if (wall2 == 3) {
							vertex(-1, height);
						}
					}
				}
				vertex(intersection2.x, intersection2.y);
				vertex(wall.b.x, wall.b.y);
				endShape(CLOSE);
			}
			}
		// for (let i = 0; i < this.rays.length; i++) {
		// 	const ray = this.rays[i];
		// 	let closest = null;
		// 	let record = Infinity;
		// 	for (let wall of walls) {
		// 		const pt = ray.cast(wall);
		// 		if (pt) {
		// 			const d = p5.Vector.dist(this.pos, pt);
		// 			if (d < record) {
		// 				record = d;
		// 				closest = pt;
		// 			}
		// 		}
		// 	}
		// 	if (closest) {
		// 		// colorMode(HSB);
		// 		// stroke((i + frameCount * 2) % 360, 255, 255, 50);
		// 		strokeWeight(1);
		// 		stroke(255);
		// 		line(this.pos.x, this.pos.y, closest.x, closest.y);
		// 		strokeWeight(1);
		// 	}
		// }
		strokeWeight(1);
	}

	show() {
		fill(255);
		ellipse(this.pos.x, this.pos.y, 4);
	}
}
