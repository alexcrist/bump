const isLeftCollision = (ball, x, y, w, h) => {
  return (
    ball.velocity.x > 0 && 
    ball.position.x + BALL_RADIUS < x &&
    ball.position.x + BALL_RADIUS + ball.velocity.x >= x &&
    ball.position.y + BALL_RADIUS > y &&
    ball.position.y - BALL_RADIUS < y + h
  );
};

const isRightCollision = (ball, x, y, w, h) => {
  return (
    ball.velocity.x < 0 && 
    ball.position.x - BALL_RADIUS > x + w &&
    ball.position.x - BALL_RADIUS + ball.velocity.x <= x + w &&
    ball.position.y + BALL_RADIUS > y &&
    ball.position.y - BALL_RADIUS < y + h
  );
};

const isTopCollision = (ball, x, y, w, h) => {
  return (
    ball.velocity.y > 0 &&
    ball.position.y + BALL_RADIUS < y &&
    ball.position.y + BALL_RADIUS + ball.velocity.y >= y &&
    ball.position.x + BALL_RADIUS > x &&
    ball.position.x - BALL_RADIUS < x + w
  );
};

const isBottomCollision = (ball, x, y, w, h) => {
  return (
    ball.velocity.y < 0 &&
    ball.position.y - BALL_RADIUS > y + h &&
    ball.position.y - BALL_RADIUS + ball.velocity.y <= y + h &&
    ball.position.x + BALL_RADIUS > x &&
    ball.position.x - BALL_RADIUS < x + w
  );
};

const isRectangleCollision = (ball, x, y, w, h) => {
  return (
    isLeftCollision(ball, x, y, w, h) ||
    isRightCollision(ball, x, y, w, h) ||
    isBottomCollision(ball, x, y, w, h) ||
    isTopCollision(ball, x, y, w, h)
  );
}

const handleRectangleCollision = (ball, speedMultiplier, x, y, w, h) => {
  
  if (isLeftCollision(ball, x, y, w, h)) {
    ball.velocity.x = -Math.abs(ball.velocity.x) * 0.5;
    ball.position.x = x - BALL_RADIUS - ball.velocity.x * speedMultiplier - 1;
  }

  else if (isRightCollision(ball, x, y, w, h)) {
    ball.velocity.x = Math.abs(ball.velocity.x) * 0.5;
    ball.position.x = x + w + BALL_RADIUS - ball.velocity.x * speedMultiplier + 1;
  }

  if (isTopCollision(ball, x, y, w, h)) {
    ball.velocity.y = -Math.abs(ball.velocity.y) * 0.5;
    ball.position.y = y - BALL_RADIUS - ball.velocity.y * speedMultiplier - 1;
  }

  else if (isBottomCollision(ball, x, y, w, h)) {
    ball.velocity.y = Math.abs(ball.velocity.y) * 0.5;
    ball.position.y = y - BALL_RADIUS - ball.velocity.y * speedMultiplier + 1;
  }
};