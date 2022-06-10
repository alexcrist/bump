const color = getRandomColor();

const balls = [];
const container = $('#container');
const score = $('#score');

const socket = io();

const addBall = (ball) => {
  ball.element = $(`<div class="ball" style="background-color: ${ball.color}"></div>`);
  container.append(ball.element);
  balls.push(ball);
};

socket.on('other player shot', (data) => {
  const ball = JSON.parse(data);
  addBall(ball);
});

let lastMouseX = 0;
let lastMouseY = 0;
let mouseDX = 0;
let mouseDY = 0;

const mousemove = (pageX, pageY) => {
  mouseDX = pageX - lastMouseX;
  mouseDY = pageY - lastMouseY;
  lastMouseX = pageX;
  lastMouseY = pageY;
};

const mouseup = (pageX, pageY) => {
  if (pageX > 400) {
    return;
  }
  const ball = {
    color,
    vectors: {
      position: {
        x: pageX,
        y: pageY
      },
      velocity: {
        x: mouseDX,
        y: mouseDY
      }
    }
  };
  addBall(ball);
  socket.emit('shot', JSON.stringify(ball));
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

  console.log(speedMultiplier);

  for (let i = 0; i < balls.length; i++) {
    balls[i].vectors.velocity.y += 0.3 * speedMultiplier;
    balls[i].vectors.position.x += balls[i].vectors.velocity.x * speedMultiplier;
    balls[i].vectors.position.y += balls[i].vectors.velocity.y * speedMultiplier;
    balls[i].element.css('left', balls[i].vectors.position.x + 'px');
    balls[i].element.css('top', balls[i].vectors.position.y + 'px');
  
    rectangleCollision(balls[i], 1000, 300, 15, 100);
    rectangleCollision(balls[i], 930, 385, 15, 15);
    rectangleCollision(balls[i], 985, 385, 15, 15, false);

    if (
      !balls[i].hasScored &&
      balls[i].vectors.velocity.y > 0 &&
      balls[i].vectors.position.x - 10 >= 930 + 15 &&
      balls[i].vectors.position.x + 10 <= 985 &&
      balls[i].vectors.position.y - 10 > 385 &&
      balls[i].vectors.position.y - 10 < 385 + 15
    ) {
      balls[i].hasScored = true;
      score.text(Number(score.text()) + 1);
    }
  }

  requestAnimationFrame(update);
};

update();
