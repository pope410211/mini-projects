(function() {

	var canvas = document.querySelector('canvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var c = canvas.getContext('2d');

	// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
	// c.fillRect(100,100, 100, 100);
	// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
	// c.fillRect(400,100, 100, 100);
	// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
	// c.fillRect(300,300, 100, 100);
	// console.log('Canvas', canvas);

	// Line
	// c.beginPath();
	// c.moveTo(50, 300);
	// c.lineTo(300, 100);
	// c.lineTo(400, 300);
	// c.strokeStyle = "#fa34a3";
	// c.stroke();


	// Arc / Circle
	// c.beginPath();
	// c.arc(300, 300, 30, 0, Math.PI * 2, false);
	// c.strokeStyle = "blue";
	// c.stroke();

	// for (var i = 0; i < 3; i++) {
	// 	var x = Math.random() * window.innerWidth;
	// 	var y = Math.random() * window.innerHeight;
	// 	var o = Math.round, r = Math.random, s = 255;
	// 	var color = 'rgba('+ o(r()*s)+ ',' + o(r()*s)+ ',' + o(r()*s) + ',' + r().toFixed(1)+')';
	// 	c.beginPath();
	// 	c.arc(x, y, 30, 0, Math.PI * 2, false);
	// 	c.strokeStyle = color;
	// 	c.stroke();
	// }

	var mouse = {
		x: undefined,
		y: undefined
	};

	var maxRadius = 40;
	// var minRadius = 2;

	var colorArray = [
		'#ECF0F1',
		'#2A2A2A',
		'#2D3540',
		'#B32536',
		'#2980B9',
	];
	var mouseLeave = false;
	canvas.addEventListener('mousemove', function(event) {
		mouseLeave = false;
		mouse.x = event.x;
		mouse.y = event.y;
	});

	window.addEventListener('resize', function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		init();
	});

	canvas.addEventListener('mouseleave', function(event) {
		mouseLeave = true;
	});

	function Circle(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
		this.minRadius = radius;

		this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
		};

		this.update = function() {

			if (this.x + this.radius > innerWidth || this.x - radius < 0) {
				this.dx = -this.dx;
			}
	
			if (this.y + this.radius > innerHeight || this.y - radius < 0) {
				this.dy = -this.dy;
			}
			this.x += this.dx;
			this.y += this.dy;

			// interactivity
			if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && mouseLeave === false) {
				if (this.radius < maxRadius) {
					this.radius += 1;
				}
			} else if (this.radius > this.minRadius) {
				this.radius -= 1;
			}

			this.draw();
		};
	}
	



	var circleArray = [];
	function init() {
		circleArray = [];

		for (var i = 0; i < 800; i++) {
			var radius = Math.random() * 3 + 1;
			var x = Math.random() * (innerWidth - radius * 2) + radius;
			var y = Math.random() * (innerHeight - radius * 2) + radius;
			var dx = (Math.random() - 0.5); // Velocity of x
			var dy = (Math.random() - 0.5); // Velocity of y
			circleArray.push(new Circle(x, y, dx, dy, radius));
		}
	}

	function animate() {
		requestAnimationFrame(animate);
		c.clearRect(0, 0, innerWidth, innerHeight);
		for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
	}

	init();
	animate();
})();