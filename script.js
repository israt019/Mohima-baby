// Matrix Effect
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const letters = Array(2048).join("HAPPY BIRTHDAY ").toUpperCase().split("");
let fontSize = 24;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];
for (let i = 0; i < columns; i++) drops[i] = 1;
function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "deeppink";
  ctx.font = "bold " + fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 30);

// Fireworks
const fireworksCanvas = document.getElementById("fireworksCanvas");
const fwCtx = fireworksCanvas.getContext("2d");
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;
class Firework {
  constructor() {
    this.x = Math.random() * fireworksCanvas.width;
    this.y = fireworksCanvas.height + 50;
    this.targetY = Math.random() * fireworksCanvas.height * 0.6;
    this.radius = 2;
    this.exploded = false;
    this.particles = [];
  }
  update() {
    if (!this.exploded) {
      this.y -= 5;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.createParticles();
      }
    } else {
      this.particles.forEach((p) => p.update());
      this.particles = this.particles.filter((p) => !p.done);
    }
  }
  draw() {
    if (!this.exploded) {
      fwCtx.beginPath();
      fwCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      fwCtx.fillStyle = "white";
      fwCtx.fill();
    } else {
      this.particles.forEach((p) => p.draw());
    }
  }
  done() {
    return this.exploded && this.particles.length === 0;
  }
  createParticles() {
    for (let i = 0; i < 30; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }
}
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = (Math.random() - 0.5) * 5;
    this.gravity = 0.05;
    this.alpha = 1;
    this.done = false;
  }
  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
    if (this.alpha <= 0) this.done = true;
  }
  draw() {
    fwCtx.beginPath();
    fwCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    fwCtx.fillStyle = `rgba(255, 100, 100, ${this.alpha})`;
    fwCtx.fill();
  }
}
let fireworks = [];
function loop() {
  fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }
  fireworks.forEach((fw) => {
    fw.update();
    fw.draw();
  });
  fireworks = fireworks.filter((fw) => !fw.done());
  requestAnimationFrame(loop);
}
loop();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) drops[i] = 1;
});
