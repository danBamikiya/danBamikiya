/*=====  Custom Cursor  ======*/
class Cursor {
  constructor(cursorElement) {
    this.cursorElement = cursorElement;
    this.init();
  }

  // Initialize
  init() {
    document.addEventListener("mousemove", (e) => this.move(e));
    document.addEventListener("click", () => this.click());
  }

  // Movement
  move(e) {
    this.cursorElement.setAttribute(
      "style",
      `top: ${e.clientY - 10}px; left: ${e.clientX - 10}px;`
    );
  }

  // Click Effect
  click() {
    this.cursorElement.classList.add("expand");
    setTimeout(() => this.cursorElement.classList.remove("expand"), 500);
  }
}


/*=====  Particles Effect  ======*/
const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  const particlesLength = Math.floor(window.innerWidth / 10);

  for (let i = 0; i <= particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0, 0, 0);
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    // Position
    this.pos = createVector(random(width), random(height));
    // Velocity
    this.vel = createVector(random(-3, 3), random(-3, 3));
    // Size
    this.size = 7;
  }

  // Update movement by adding velocity
  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  // Draw single particle
  draw() {
    noStroke();
    fill("rgba(240, 128, 128, 0.8)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  // Detect edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  // Connect  particles
  checkParticles(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if (d < 115) {
        stroke("rgba(224, 229, 235, 0.6)");
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}

/*=====  Typewriter Effect  ======*/
class TypeWriter {
  constructor(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  // Type Method
  type() {
    // Current index of word
    const currentWord = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[currentWord];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">a ${this.txt}</span>`;

    //  InitialType Speed
    let typeSpeed = 80;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    //  If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Add blink to cursor
      this.txtElement.firstElementChild.classList.add("blink");
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  const cursor = document.querySelector(".cursor");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
  // Init Cursor
  new Cursor(cursor);
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);






/******Experiment****/
// function Obj(obj, ...Bases) {
// 	let bases;

// 	for (let Base of Bases)
// 		bases = [obj, ...[Base.prototype, Base]];

// 	const multiObj = Object.create({
// 		getPropertyDescriptor: function (name) {
// 			let prop;
// 			for (let base of bases)
// 				prop = Object.getPropertyDescriptor(base, name);

// 			if (prop)
// 				return prop
// 		},
// 		getPropertyNames: function () {
// 			let names = [];
// 			for (let base of bases)
// 				for (let name of Object.getPropertyNames(base))
// 					if (!~names.indexOf(name))
// 						names.push(name)

// 			return names
// 		},
// 		getOwnPropertyDescriptor: function (name) {
// 			return Object.getOwnPropertyDescriptor(obj, name)
// 		},
// 		getOwnPropertyNames: function () {
// 			return Object.getOwnPropertyNames(obj)
// 		},
// 		defineProperty: function (name, prop) {
// 			Object.defineProperty(obj, name, prop)
// 			return multiObj
// 		},
// 		'delete': function (name) {
// 			return delete obj[name]
// 		},
// 		fix: function () {
// 			if (!Object.isFrozen(obj))
// 				return

// 			let result = {}

// 			for (let name of Object.getOwnPropertyNames(obj))
// 				result[name] = Object.getOwnPropertyDescriptor(obj, name)

// 			return result
// 		}
// 	})

// 	return multiObj
// }
