let walls = [];
let ray, outerWalls = [];
let particle;
let xoff = 0;
let yoff = 10000;
let bgImg;

function preload() {
	bgImg = loadImage("bg-img.jpeg");
}

function setup() {
	createCanvas(400, 400);
	for (let i = 0; i < 0; i++) {
		let x1 = random(width);
		let x2 = x1 + random(-100, 100);
		let y1 = random(height);
		let y2 = y1 + random(-100, 100);
		walls[i] = new Boundary(x1, y1, x2, y2);
	}
	outerWalls.push(new Boundary(-1, -1, width, -1));
	outerWalls.push(new Boundary(width, -1, width, height));
	outerWalls.push(new Boundary(width, height, -1, height));
	outerWalls.push(new Boundary(-1, height, -1, -1));
	particle = new Particle();
}

function draw() {
	image(bgImg, 0, 0, width, height);
	// background(0, 100);
	for (let wall of walls) {
		wall.show();
	}
	particle.update(noise(xoff) * width, noise(yoff) * height);
	// particle.update(mouseX, mouseY);
	particle.show();
	particle.look(walls, outerWalls);

	xoff += 0.005;
	yoff += 0.005;
	// console.log(Math.sign(p5.Vector.dot(walls[0].getDirVec().normalize(), particle.pos.copy().sub(walls[0].a).normalize())));
}

let startx, starty, endx, endy;

function mouseDragged() {
	if (!startx || !starty) {
		startx = mouseX;
		starty = mouseY;
	}
}

function mouseReleased() {
	if (!endx || !endy) {
		endx = mouseX;
		endy = mouseY;
		walls.push(new Boundary(startx, starty, endx, endy));
		startx = 0; starty = 0; endx = 0; endy = 0;
	}
}