const isLeftCollision = (ball, speedMultiplier, x, y, w, h) => {
  return (
    ball.velocity.x > 0 && 
    ball.position.x + BALL_RADIUS <= x &&
    ball.position.x + BALL_RADIUS + ball.velocity.x * speedMultiplier >= x &&
    ball.position.y + BALL_RADIUS + ball.velocity.y * speedMultiplier >= y &&
    ball.position.y - BALL_RADIUS + ball.velocity.y * speedMultiplier <= y + h
  );
};

const isRightCollision = (ball, speedMultiplier, x, y, w, h) => {
  return (
    ball.velocity.x < 0 && 
    ball.position.x - BALL_RADIUS >= x + w &&
    ball.position.x - BALL_RADIUS + ball.velocity.x * speedMultiplier <= x + w &&
    ball.position.y + BALL_RADIUS + ball.velocity.y * speedMultiplier >= y &&
    ball.position.y - BALL_RADIUS + ball.velocity.y * speedMultiplier <= y + h
  );
};

const isTopCollision = (ball, speedMultiplier, x, y, w, h) => {
  return (
    ball.velocity.y > 0 &&
    ball.position.y + BALL_RADIUS <= y &&
    ball.position.y + BALL_RADIUS + ball.velocity.y * speedMultiplier >= y &&
    ball.position.x + BALL_RADIUS + ball.velocity.x * speedMultiplier >= x &&
    ball.position.x - BALL_RADIUS + ball.velocity.x * speedMultiplier <= x + w
  );
};

const isBottomCollision = (ball, speedMultiplier, x, y, w, h) => {
  return (
    ball.velocity.y < 0 &&
    ball.position.y - BALL_RADIUS >= y + h &&
    ball.position.y - BALL_RADIUS + ball.velocity.y * speedMultiplier <= y + h &&
    ball.position.x + BALL_RADIUS + ball.velocity.x * speedMultiplier >= x &&
    ball.position.x - BALL_RADIUS + ball.velocity.x * speedMultiplier <= x + w
  );
};

const isRectangleCollision = (ball, speedMultiplier, x, y, w, h) => {
  return (
    isLeftCollision(ball, speedMultiplier, x, y, w, h) ||
    isRightCollision(ball, speedMultiplier, x, y, w, h) ||
    isBottomCollision(ball, speedMultiplier, x, y, w, h) ||
    isTopCollision(ball, speedMultiplier, x, y, w, h)
  );
}

const handleRectangleCollision = (ball, speedMultiplier, x, y, w, h) => {
  
  if (isLeftCollision(ball, speedMultiplier, x, y, w, h)) {
    ball.velocity.x = -Math.abs(ball.velocity.x) * 0.5;
    ball.position.x = x - BALL_RADIUS - ball.velocity.x * speedMultiplier;
  }

  else if (isRightCollision(ball, speedMultiplier, x, y, w, h)) {
    ball.velocity.x = Math.abs(ball.velocity.x) * 0.5;
    ball.position.x = x + w + BALL_RADIUS - ball.velocity.x * speedMultiplier;
  }

  if (isTopCollision(ball, speedMultiplier, x, y, w, h)) {
    ball.velocity.y = -Math.abs(ball.velocity.y) * 0.5;
    ball.position.y = y - BALL_RADIUS - ball.velocity.y * speedMultiplier;
  }

  else if (isBottomCollision(ball, speedMultiplier, x, y, w, h)) {
    ball.velocity.y = Math.abs(ball.velocity.y) * 0.5;
    ball.position.y = y + h + BALL_RADIUS - ball.velocity.y * speedMultiplier;
  }
};