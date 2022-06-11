
const rectangleCollision = (ball, x, y, w, h) => {
  // Collision with left edge
  if (
    ball.velocity.x > 0 && 
    ball.position.x + BALL_RADIUS < x &&
    ball.position.x + BALL_RADIUS + ball.velocity.x >= x &&
    ball.position.y + BALL_RADIUS > y &&
    ball.position.y - BALL_RADIUS < y + h
  ) {
    ball.velocity.x = -Math.abs(ball.velocity.x) * 0.5;
    ball.position.x = x - BALL_RADIUS - ball.velocity.x;
  }

  // Collision with right edge
  else if (
    ball.velocity.x < 0 && 
    ball.position.x - BALL_RADIUS > x + w &&
    ball.position.x - BALL_RADIUS + ball.velocity.x <= x + w &&
    ball.position.y + BALL_RADIUS > y &&
    ball.position.y - BALL_RADIUS < y + h
  ) {
    ball.velocity.x = Math.abs(ball.velocity.x) * 0.5;
    ball.position.x = x + w + BALL_RADIUS - ball.velocity.x;
  }

  // Collision with top edge
  if (
    ball.velocity.y > 0 &&
    ball.position.y + BALL_RADIUS < y &&
    ball.position.y + BALL_RADIUS + ball.velocity.y >= y &&
    ball.position.x + BALL_RADIUS > x &&
    ball.position.x - BALL_RADIUS < x + w
  ) {
    ball.velocity.y = -Math.abs(ball.velocity.y) * 0.5;
    ball.position.y = y - BALL_RADIUS - ball.velocity.y;
  }

  // Collision with bottom edge
  else if (
    ball.velocity.y < 0 &&
    ball.position.y - BALL_RADIUS > y + h &&
    ball.position.y - BALL_RADIUS + ball.velocity.y <= y + h &&
    ball.position.x + BALL_RADIUS > x &&
    ball.position.x - BALL_RADIUS < x + w
  ) {
    ball.velocity.y = Math.abs(ball.velocity.y) * 0.5;
    ball.position.y = y - BALL_RADIUS - ball.velocity.y;
  }
};