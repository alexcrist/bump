// DOM Elements ================================================================

const container = $('#container');
const score = $('#score');
const hoverBall = $('#hover-ball');

// Scale to screen size ========================================================

console.log(SCALE);
if (SCALE < 1) {
  container.css({
    transform: `scale(${SCALE})`,
    width: 100 / SCALE + 'vw'
  });
}

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
    hoverBall.css('background-color', COLOR);
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
    handleRectangleCollision(balls[i], speedMultiplier, BACKBOARD_X, BACKBOARD_Y, BACKBOARD_WIDTH, BACKBOARD_HEIGHT);
    handleRectangleCollision(balls[i], speedMultiplier, RIM_FRONT_X, RIM_FRONT_Y, RIM_FRONT_WIDTH, RIM_FRONT_HEIGHT);
    handleRectangleCollision(balls[i], speedMultiplier, RIM_BACK_X, RIM_BACK_Y, RIM_BACK_WIDTH, RIM_BACK_HEIGHT);

    // Update ball position / velocity
    balls[i].velocity.y += GRAVITY * speedMultiplier;
    balls[i].position.x += balls[i].velocity.x * speedMultiplier;
    balls[i].position.y += balls[i].velocity.y * speedMultiplier;
    balls[i].element.css('left', balls[i].position.x + 'px');
    balls[i].element.css('top', balls[i].position.y + 'px');
   
    // Detect scores
    if (
      !balls[i].hasScored &&
      balls[i].velocity.y > 0 &&
      isRectangleCollision(balls[i], speedMultiplier, RIM_MIDDLE_X + BALL_RADIUS, RIM_MIDDLE_Y + RIM_MIDDLE_HEIGHT - 1, RIM_MIDDLE_WIDTH - BALL_RADIUS * 2, 1)
    ) {
      balls[i].hasScored = true;
      score.text(Number(score.text()) + 1);
    }
  }

  requestAnimationFrame(update);
};

update();
