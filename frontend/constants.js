const getCssNumber = (x, key) => Number(x.css(key).replace('px', ''));

const COLOR = getRandomColor();
const BALL_DESPAWN_Y = 1000;
const EXPECTED_CYCLE_MS = 25;
const GRAVITY = 0.45;

const BALL = $('.ball');
const BALL_RADIUS = getCssNumber(BALL, 'width') / 2;

const SHOOTING_AREA = $('#shooting-area');
const SHOOTING_AREA_WIDTH = getCssNumber(SHOOTING_AREA, 'width');

const BACKBOARD = $('#back-board');
const BACKBOARD_X = getCssNumber(BACKBOARD, 'left');
const BACKBOARD_Y = getCssNumber(BACKBOARD, 'top');
const BACKBOARD_WIDTH = getCssNumber(BACKBOARD, 'width');
const BACKBOARD_HEIGHT = getCssNumber(BACKBOARD, 'height');

const RIM_FRONT = $('#rim-front');
const RIM_FRONT_X = getCssNumber(RIM_FRONT, 'left');
const RIM_FRONT_Y = getCssNumber(RIM_FRONT, 'top');
const RIM_FRONT_WIDTH = getCssNumber(RIM_FRONT, 'width');
const RIM_FRONT_HEIGHT = getCssNumber(RIM_FRONT, 'height');

const RIM_MIDDLE = $('#rim-middle');
const RIM_MIDDLE_X = getCssNumber(RIM_MIDDLE, 'left');
const RIM_MIDDLE_Y = getCssNumber(RIM_MIDDLE, 'top');
const RIM_MIDDLE_WIDTH = getCssNumber(RIM_MIDDLE, 'width');
const RIM_MIDDLE_HEIGHT = getCssNumber(RIM_MIDDLE, 'height');

const RIM_BACK = $('#rim-back');
const RIM_BACK_X = getCssNumber(RIM_BACK, 'left');
const RIM_BACK_Y = getCssNumber(RIM_BACK, 'top');
const RIM_BACK_WIDTH = getCssNumber(RIM_BACK, 'width');
const RIM_BACK_HEIGHT = getCssNumber(RIM_BACK, 'height');

const CONTAINER = $('#container');
const CONTAINER_WIDTH = getCssNumber(CONTAINER, 'width');
const GAME_WIDTH = BACKBOARD_X + BACKBOARD_WIDTH + 30;
const SCALE = CONTAINER_WIDTH / GAME_WIDTH;
