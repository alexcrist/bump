// DOM Elements ================================================================

const container = $('#container');
const score = $('#score');
const hoverBall = $('#hover-ball');

// Game state ==================================================================

const balls = [];
let lastMouseX = 0;
let lastMouseY = 0;
let cycleStart = new Date();

// Helpers =====================================================================

const addBall = (ball, balls, container) => {
  ball.element = $(`<div class="ball" style="background-color: ${ball.color}"></div>`);
  container.append(ball.element);
  balls.push(ball);
};

const createBall = (x, y, dX, dY, balls, container) => {
  const ball = {
    color: COLOR,
    position: { x, y },
    velocity: { x: dX, y: dY }
  };
  addBall(ball, balls, container);
  socket.emit('shot', JSON.stringify(ball));
};

const drawHoverBall = (x, y) => {
  if (x < SHOOTING_AREA_WIDTH) {
    hoverBall.css('opacity', 1);
    hoverBall.css('color', COLOR);
    hoverBall.css('left', x);
    hoverBall.css('top', y);
    container.css('cursor', 'grabbing');
  } else {
    hoverBall.css('opacity', 0);
    container.css('cursor', 'auto');
  }
};

const onMouseMove = (pageX, pageY) => {
  drawHoverBall(pageX, pageY);
  if (lastMouseX <= SHOOTING_AREA_WIDTH && pageX > SHOOTING_AREA_WIDTH) {
    const mouseDX = pageX - lastMouseX;
    const mouseDY = pageY - lastMouseY;
    createBall(lastMouseX, lastMouseY, mouseDX, mouseDY, balls, container);
  }
  lastMouseX = pageX;
  lastMouseY = pageY;
};

// Web socket ==================================================================

const socket = io();
socket.on('other player shot', (data) => addBall(JSON.parse(data), balls, container));

// Event listeners =============================================================

$('body').on('mousemove', (event) => {
  const { pageX, pageY } = event.originalEvent;
  onMouseMove(pageX, pageY);
});

$('body').on('touchmove', (event) => {
  const { pageX, pageY } = event.originalEvent.touches[0];
  onMouseMove(pageX, pageY);
});

// Update loop =================================================================

const update = () => {

  // Calculate a game speed multiplier based on time since last update
  const cycleTime = new Date() - cycleStart;
  cycleStart = new Date();
  const speedMultiplier = cycleTime / EXPECTED_CYCLE_MS;

  for (let i = 0; i < balls.length; i++) {

    // Delete off-screen balls
    if (balls[i].position.y > BALL_DESPAWN_Y) {
      balls[i].element.remove();
      balls.splice(i, 1);
      i--;
      continue;
    }

    // Handle collisions
    rectangleCollision(balls[i], BACKBOARD_X, BACKBOARD_Y, BACKBOARD_WIDTH, BACKBOARD_HEIGHT);
    rectangleCollision(balls[i], RIM_FRONT_X, RIM_FRONT_Y, RIM_FRONT_WIDTH, RIM_FRONT_HEIGHT);
    rectangleCollision(balls[i], RIM_BACK_X, RIM_BACK_Y, RIM_BACK_WIDTH, RIM_BACK_HEIGHT);

    // Update ball position / velocity
    balls[i].velocity.y += 0.3 * speedMultiplier;
    balls[i].position.x += balls[i].velocity.x * speedMultiplier;
    balls[i].position.y += balls[i].velocity.y * speedMultiplier;
    balls[i].element.css('left', balls[i].position.x + 'px');
    balls[i].element.css('top', balls[i].position.y + 'px');
   
    // Detect scores
    if (
      !balls[i].hasScored &&
      balls[i].velocity.y > 0 &&
      balls[i].position.x - 10 >= 930 + 15 &&
      balls[i].position.x + 10 <= 985 &&
      balls[i].position.y - 10 > 385 &&
      balls[i].position.y - 10 < 385 + 15
    ) {
      balls[i].hasScored = true;
      score.text(Number(score.text()) + 1);
    }
  }

  requestAnimationFrame(update);
};

update();
