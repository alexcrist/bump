const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const rectangleCollision = (ball, x, y, w, h, hasRightEdge=false, ballRadius=10) => {
  if (
    ball.position.x + ballRadius >= x &&
    ball.position.x - ballRadius < x + w &&
    ball.position.y + ballRadius > y &&
    ball.position.y - ballRadius < y + h
  ) {
    if (ball.velocity.x > 0) {
      ball.position.x = x - ballRadius;
      ball.velocity.x *= -0.5;
    } else if (ball.velocity.x < 0) {
      if (hasRightEdge) {
        ball.position.x = x + w + ballRadius;
        ball.velocity.x *= -0.5;
      }
    } else {
      ball.velocity.y *= -0.5;
      ball.position.y = y - ballRadius;
    }
  }
};