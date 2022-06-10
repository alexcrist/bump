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
    ball.vectors.position.x + ballRadius >= x &&
    ball.vectors.position.x - ballRadius < x + w &&
    ball.vectors.position.y + ballRadius > y &&
    ball.vectors.position.y - ballRadius < y + h
  ) {
    if (ball.vectors.velocity.x > 0) {
      ball.vectors.position.x = x - ballRadius;
      ball.vectors.velocity.x *= -0.5;
    } else if (ball.vectors.velocity.x < 0) {
      if (hasRightEdge) {
        ball.vectors.position.x = x + w + ballRadius;
        ball.vectors.velocity.x *= -0.5;
      }
    } else {
      ball.vectors.velocity.y *= -0.5;
      ball.vectors.position.y = y - ballRadius;
    }
  }
};