
const balls = [];
const container = $('#container');
const score = $('#score');
const hoverBall = $(`<div class="ball" style="opacity: 0; background-color: ${COLOR}"></div>`);
container.append(hoverBall);

const storeBall = (ball) => {
  ball.element = $(`<div class="ball" style="background-color: ${ball.color}"></div>`);
  container.append(ball.element);
  balls.push(ball);
};

const createBall = (x, y, dX, dY) => {
  const ball = {
    color: COLOR,
    position: { x, y },
    velocity: { x: dX, y: dY }
  };
  storeBall(ball);
  socket.emit('shot', JSON.stringify(ball));
};

const socket = io();
socket.on('other player shot', (data) => storeBall(JSON.parse(data)));

let lastMouseX = 0;
let lastMouseY = 0;

const mousemove = (pageX, pageY) => {
  if (pageX < SHOOTING_AREA_WIDTH) {
    hoverBall.css('opacity', 1);
    hoverBall.css('left', pageX);
    hoverBall.css('top', pageY);
    container.css('cursor', 'grabbing');
  } else {
    hoverBall.css('opacity', 0);
    container.css('cursor', 'auto');
  }

  if (
    lastMouseX <= SHOOTING_AREA_WIDTH && 
    pageX > SHOOTING_AREA_WIDTH
  ) {
    const mouseDX = pageX - lastMouseX;
    const mouseDY = pageY - lastMouseY;
    createBall(lastMouseX, lastMouseY, mouseDX, mouseDY)
  }
  lastMouseX = pageX;
  lastMouseY = pageY;
};

$('body').on('mousemove', (event) => {
  const { pageX, pageY } = event.originalEvent;
  mousemove(pageX, pageY);
});

$('body').on('mouseup', (event) => {
  const { pageX, pageY } = event.originalEvent;
  mouseup(pageX, pageY);
});

$('body').on('touchmove', (event) => {
  const { pageX, pageY } = event.originalEvent.touches[0];
  mousemove(pageX, pageY);
});

$('body').on('touchup', (event) => {
  const { pageX, pageY } = event.originalEvent.touches[0];
  mouseup(pageX, pageY);
});

let time = new Date();
const expectedTimeElapsed = 25;

const update = () => {
  const timeElapsed = new Date() - time;
  time = new Date();
  const speedMultiplier = timeElapsed / expectedTimeElapsed;

  for (let i = 0; i < balls.length; i++) {
    balls[i].velocity.y += 0.3 * speedMultiplier;
    balls[i].position.x += balls[i].velocity.x * speedMultiplier;
    balls[i].position.y += balls[i].velocity.y * speedMultiplier;
    balls[i].element.css('left', balls[i].position.x + 'px');
    balls[i].element.css('top', balls[i].position.y + 'px');
  
    rectangleCollision(balls[i], 1000, 300, 15, 100);
    rectangleCollision(balls[i], 930, 385, 15, 15);
    rectangleCollision(balls[i], 985, 385, 15, 15, false);

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
