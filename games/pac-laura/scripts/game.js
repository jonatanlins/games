function createGame(canvas, requestAnimationFrame, setInterval) {
  function setup() {
    canvas.width = 336;
    canvas.height = 336;

    const screen = canvas.getContext("2d");

    const state = {
      player: {
        x: 3,
        y: 13,
        speedX: 0,
        speedY: 0,
        sprite: "blackGirl",
        nextSpeedX: 0,
        nextSpeedY: 0,
      },
      gameOver: false,
      settings: {
        defaultSpeed: 0.03,
      },
      scene: [
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 10, 2, 2, 2, 2, 2, 2, 2, 2, 12],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 13],
        [3, 0, 4, 5, 0, 4, 6, 5, 0, 9, 0, 4, 6, 5, 0, 4, 5, 0, 13],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
        [3, 0, 4, 5, 0, 7, 0, 4, 6, 11, 6, 5, 0, 7, 0, 4, 5, 0, 13],
        [3, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 13],
        [14, 15, 15, 16, 0, 17, 6, 5, 0, 9, 0, 4, 6, 18, 0, 19, 15, 15, 20],
        [0, 0, 0, 3, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 13, 0, 0, 0],
        [0, 0, 0, 3, 0, 9, 0, 19, 28, 28, 28, 16, 0, 9, 0, 13, 0, 0, 0],
        [0, 0, 0, 3, 0, 0, 0, 13, 0, 0, 0, 3, 0, 0, 0, 13, 0, 0, 0],
        [0, 0, 0, 3, 0, 7, 0, 22, 2, 2, 2, 21, 0, 7, 0, 13, 0, 0, 0],
        [0, 0, 0, 3, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 13, 0, 0, 0],
        [1, 2, 2, 21, 0, 9, 0, 4, 6, 11, 6, 5, 0, 9, 0, 22, 2, 2, 12],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 13],
        [3, 0, 4, 23, 0, 4, 6, 5, 0, 9, 0, 4, 6, 5, 0, 24, 5, 0, 13],
        [3, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 13],
        [25, 5, 0, 9, 0, 7, 0, 4, 6, 11, 6, 5, 0, 7, 0, 9, 0, 4, 26],
        [3, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 13],
        [3, 0, 4, 6, 6, 27, 6, 5, 0, 9, 0, 4, 6, 27, 6, 6, 5, 0, 13],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
        [
          14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
          15, 20,
        ],
      ],
      enemies: [
        { sprites: ["enemy1"], x: 8, y: 9, speedX: 0, speedY: 0 },
        { sprites: ["enemy2"], x: 9, y: 9, speedX: 0, speedY: 0 },
        { sprites: ["enemy3"], x: 10, y: 9, speedX: 0, speedY: 0 },
        { sprites: ["enemy4"], x: 9, y: 9, speedX: 0, speedY: 0 },
      ],
      stars: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    };
    window.state = state; // for debug purposes

    render(screen, state, requestAnimationFrame);

    const commandDispatcher = createCommandDispatcher(state);
    const keyboardListener = createKeyboardListener(window.addEventListener);
    keyboardListener.subscribe(commandDispatcher.dispatch);

    setInterval(update, 1000 / 120, state);
  }

  function getNextPlayerPosition(state) {
    const x =
      state.player.speedX > 0
        ? Math.ceil(state.player.x)
        : 0 > state.player.speedX
        ? Math.floor(state.player.x)
        : Math.round(state.player.x);
    const y =
      state.player.speedY > 0
        ? Math.ceil(state.player.y)
        : 0 > state.player.speedY
        ? Math.floor(state.player.y)
        : Math.round(state.player.y);

    return state.scene?.[y]?.[x];
  }

  function shouldPlayerTurn(state) {
    const { nextSpeedX, nextSpeedY } = state.player;
    const playerX = state.player.x + nextSpeedX;
    const playerY = state.player.y + nextSpeedY;
    const shiftX = Math.abs(state.player.x % 1);
    const shiftY = Math.abs(state.player.y % 1);

    if (!nextSpeedX && !nextSpeedY) return false;
    if ((shiftX < 0.1 || shiftX > 0.9) && (shiftY < 0.1 || shiftY > 0.9)) {
      const x =
        nextSpeedX > 0
          ? Math.ceil(playerX)
          : 0 > nextSpeedX
          ? Math.floor(playerX)
          : Math.round(playerX);
      const y =
        nextSpeedY > 0
          ? Math.ceil(playerY)
          : 0 > nextSpeedY
          ? Math.floor(playerY)
          : Math.round(playerY);

      return !state.scene?.[y]?.[x];
    } else {
      return false;
    }
  }

  function getNextEnemyState(enemy, state) {
    if (!enemy.speedX && !enemy.speedY) {
      const nextPositions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ].filter(({ x, y }) => {
        const sceneTile =
          state.scene?.[Math.round(enemy.y) + y]?.[Math.round(enemy.x) + x];
        return !sceneTile || sceneTile === 28;
      });
      const nextPosition =
        nextPositions[Math.floor(Math.random() * nextPositions.length)];

      enemy.speedX = nextPosition.x * state.settings.defaultSpeed;
      enemy.speedY = nextPosition.y * state.settings.defaultSpeed;
    }

    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    const nextX =
      enemy.speedX > 0
        ? Math.ceil(enemy.x)
        : 0 > enemy.speedX
        ? Math.floor(enemy.x)
        : Math.round(enemy.x);
    const nextY =
      enemy.speedY > 0
        ? Math.ceil(enemy.y)
        : 0 > enemy.speedY
        ? Math.floor(enemy.y)
        : Math.round(enemy.y);
    const nextSceneTile = state.scene?.[nextY]?.[nextX];
    const nextSceneTileIsSolid =
      nextSceneTile && !(nextSceneTile === 28 && enemy.speedY < 0);

    if (nextSceneTileIsSolid) {
      enemy.x = Math.round(enemy.x);
      enemy.y = Math.round(enemy.y);
      enemy.speedX = 0;
      enemy.speedY = 0;
    }

    return enemy;
  }

  function update(state) {
    if (!state.gameOver) {
      state.player.x += state.player.speedX;
      state.player.y += state.player.speedY;

      const playerTileX = Math.round(state.player.x);
      const playerTileY = Math.round(state.player.y);

      state.enemies.forEach((enemy, index) => {
        state.enemies[index] = getNextEnemyState(enemy, state);
      });

      if (!!getNextPlayerPosition(state)) {
        state.player.x = Math.round(state.player.x);
        state.player.y = Math.round(state.player.y);
        state.player.speedX = 0;
        state.player.speedY = 0;
      }

      if (shouldPlayerTurn(state)) {
        state.player.x = Math.round(state.player.x);
        state.player.y = Math.round(state.player.y);
        state.player.speedX = state.player.nextSpeedX;
        state.player.speedY = state.player.nextSpeedY;
        state.player.nextSpeedX = 0;
        state.player.nextSpeedY = 0;
      }

      if (state.stars?.[playerTileY]?.[playerTileX]) {
        state.stars[playerTileY][playerTileX] = 0;
      }

      if (
        state.enemies.some(
          (enemy) =>
            Math.round(enemy.x) === playerTileX &&
            Math.round(enemy.y) === playerTileY
        )
      ) {
        state.gameOver = true;
      }
    }
  }

  function render(screen, state, requestAnimationFrame) {
    screen.clearRect(0, 0, canvas.width, canvas.height);

    screen.fillStyle = "#3a3a3a";

    state.scene.forEach((row, y) => {
      row.forEach((cell, x) => {
        renderSprite(screen, "sceneTile" + cell, x * 16, y * 16);
      });
    });

    state.stars.forEach((row, y) => {
      row.forEach((star, x) => {
        if (star) {
          renderSprite(screen, "star", x * 16, y * 16);
        }
      });
    });

    state.enemies.forEach((enemy) => {
      renderSprite(screen, enemy.sprites[0], enemy.x * 16, enemy.y * 16);
    });

    renderSprite(screen, "blackGirl", state.player.x * 16, state.player.y * 16);

    requestAnimationFrame(() => render(screen, state, requestAnimationFrame));
  }

  // prettier-ignore
  const sprites = {
    blackGirl: [
      [],
      [null, null, null, null, "#4e2418", "#4e2418"],
      [null, null, null, null, "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", null],
      [null, null, null, null, null, "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418"],
      [null, null, null, "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#4e2418"],
      [null, null, null, "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b"],
      [null, null, null, null, "#4e2418", "#cb724b", "#4e2418", "#cb724b", "#300101", "#cb724b", "#cb724b", "#300101", "#cb724b"],
      [null, null, null, "#4e2418", "#4e2418", "#cb724b", "#cb724b", "#cb724b", "#300101", "#cb724b", "#cb724b", "#300101", "#cb724b"],
      [null, null, null, "#4e2418", "#4e2418", "#4e2418", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b"],
      [null, null, null, null, null, null, null, "#de1d30", "#de1d30", "#de1d30", "#cb724b", "#de1d30"],
      [null, null, null, null, null, null, null, "#de1d30", "#de1d30", "#de1d30", "#de1d30", "#de1d30"],
      [null, null, null, null, null, null, null, "#cb724b", "#de1d30", "#de1d30", "#de1d30", "#de1d30"],
      [null, null, null, null, null, null, null, "#cb724b", "#de1d30", "#de1d30", "#de1d30", "#cb724b"],
      [null, null, null, null, null, null, null, null, "#303030", null, "#303030", null],
      [null, null, null, null, null, null, null, null, "#303030", null, "#303030", null],
      [],
    ],
    enemy1:[
      [],
      [null, null, null, null, null, null, '#ef1820', '#ef1820', '#ef1820', '#ef1820'],
      [null, null, null, null, '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820'],
      [null, null, null, '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820'],
      [null, null, '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820'],
      [null, null, '#ef1820', '#ef1820', '#ffffff', '#ffffff', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ffffff', '#ffffff', '#ef1820', '#ef1820'],
      [null, null, '#ef1820', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ef1820', '#ef1820', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ef1820'],
      [null, '#ef1820', '#ef1820', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ef1820', '#ef1820', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ef1820', '#ef1820'],
      [null, '#ef1820', '#ef1820', '#ffffff', '#006bbe', '#006bbe', '#ffffff', '#ef1820', '#ef1820', '#ffffff', '#006bbe', '#006bbe', '#ffffff', '#ef1820', '#ef1820'],
      [null, '#ef1820', '#ef1820', '#ef1820', '#006bbe', '#006bbe', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#006bbe', '#006bbe', '#ef1820', '#ef1820', '#ef1820'],
      [null, '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820'],
      [null, '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820', '#ef1820'],
      [null, '#ef1820', '#ef1820', '#ef1820', '#ef1820', null, '#ef1820', '#ef1820', '#ef1820', '#ef1820', null, '#ef1820', '#ef1820', '#ef1820', '#ef1820'],
      [null, null, '#ef1820', '#ef1820', null, null, null, '#ef1820', '#ef1820', null, null, null, '#ef1820', '#ef1820'],
      [null, ],
      [],
    ],
    enemy2:[
      [],
      [null, null, null, null, null, null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, null, null, null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, null, null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, null, '#ffbcdd', '#ffbcdd', '#ffffff', '#ffffff', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffffff', '#ffffff', '#ffbcdd', '#ffbcdd'],
      [null, null, '#ffbcdd', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffbcdd', '#ffbcdd', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffbcdd'],
      [null, '#ffbcdd', '#ffbcdd', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffbcdd', '#ffbcdd', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffbcdd', '#ffbcdd'],
      [null, '#ffbcdd', '#ffbcdd', '#ffffff', '#006bbe', '#006bbe', '#ffffff', '#ffbcdd', '#ffbcdd', '#ffffff', '#006bbe', '#006bbe', '#ffffff', '#ffbcdd', '#ffbcdd'],
      [null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#006bbe', '#006bbe', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#006bbe', '#006bbe', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', null, '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, null, '#ffbcdd', '#ffbcdd', null, null, null, '#ffbcdd', '#ffbcdd', null, null, null, '#ffbcdd', '#ffbcdd'],
      [null, ],
      [],
    ],
    enemy3:[
      [],
      [null, null, null, null, null, null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf'],
      [null, null, null, null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf'],
      [null, null, null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf'],
      [null, null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf'],
      [null, null, '#00ffdf', '#00ffdf', '#ffffff', '#ffffff', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#ffffff', '#ffffff', '#00ffdf', '#00ffdf'],
      [null, null, '#00ffdf', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#00ffdf', '#00ffdf', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#00ffdf'],
      [null, '#00ffdf', '#00ffdf', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#00ffdf', '#00ffdf', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#00ffdf', '#00ffdf'],
      [null, '#00ffdf', '#00ffdf', '#ffffff', '#006bbe', '#006bbe', '#ffffff', '#00ffdf', '#00ffdf', '#ffffff', '#006bbe', '#006bbe', '#ffffff', '#00ffdf', '#00ffdf'],
      [null, '#00ffdf', '#00ffdf', '#00ffdf', '#006bbe', '#006bbe', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#006bbe', '#006bbe', '#00ffdf', '#00ffdf', '#00ffdf'],
      [null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf'],
      [null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf'],
      [null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf', null, '#00ffdf', '#00ffdf', '#00ffdf', '#00ffdf'],
      [null, null, '#00ffdf', '#00ffdf', null, null, null, '#00ffdf', '#00ffdf', null, null, null, '#00ffdf', '#00ffdf'],
      [null, ],
      [],
    ],
    enemy4:[
      [],
      [null, null, null, null, null, null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42'],
      [null, null, null, null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42'],
      [null, null, null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42'],
      [null, null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42'],
      [null, null, '#ffbd42', '#ffbd42', '#ffffff', '#ffffff', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffffff', '#ffffff', '#ffbd42', '#ffbd42'],
      [null, null, '#ffbd42', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffbd42', '#ffbd42', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffbd42'],
      [null, '#ffbd42', '#ffbd42', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffbd42', '#ffbd42', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffbd42', '#ffbd42'],
      [null, '#ffbd42', '#ffbd42', '#ffffff', '#006bbe', '#006bbe', '#ffffff', '#ffbd42', '#ffbd42', '#ffffff', '#006bbe', '#006bbe', '#ffffff', '#ffbd42', '#ffbd42'],
      [null, '#ffbd42', '#ffbd42', '#ffbd42', '#006bbe', '#006bbe', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#006bbe', '#006bbe', '#ffbd42', '#ffbd42', '#ffbd42'],
      [null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42'],
      [null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42'],
      [null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42', null, '#ffbd42', '#ffbd42', '#ffbd42', '#ffbd42'],
      [null, null, '#ffbd42', '#ffbd42', null, null, null, '#ffbd42', '#ffbd42', null, null, null, '#ffbd42', '#ffbd42'],
      [null, ],
      [],
    ],
    star:[
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [null, null, null, null, null, null, null, '#f1fac3', '#f1fac3'],
      [null, null, null, null, null, null, null, '#f1fac3', '#f1fac3'],
    ],

    sceneTile1:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
    ],
    sceneTile2:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
    ],
    sceneTile3:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
    ],
    sceneTile4:[
      [null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
    ],
    sceneTile5:[
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null],
    ],
    sceneTile6:[
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
    ],
    sceneTile7:[
      [null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
    ],
    sceneTile8:[
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
    ],
    sceneTile9:[
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      [null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null],
    ],
    sceneTile10:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile11:[
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile12:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile13:[
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile14:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile15:[
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile16:[
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
    ],
    sceneTile17:[
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile18:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
    ],
    sceneTile19:[
      [null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile20:[
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile21:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, '#645dc5'],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null],
    ],
    sceneTile22:[
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
    ],
    sceneTile23:[
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5'],
    ],
    sceneTile24:[
      [null, null, '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
      [null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile25:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, '#645dc5', null, null],
    ],
    sceneTile26:[
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, '#645dc5', null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
    sceneTile27:[
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ['#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5', '#645dc5'],
    ],
    sceneTile28:[
      ['#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      ['#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd', '#ffbcdd'],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    ],
  };

  function renderSprite(screen, id, startX, startY) {
    const sprite = sprites[id];

    if (!sprite) return;

    sprite.map((row, y) => {
      row.map((pixel, x) => {
        if (pixel) {
          screen.fillStyle = pixel;
          screen.fillRect(Math.round(startX + x), Math.round(startY + y), 1, 1);
        }
      });
    });
  }

  return { setup };
}

function createCommandDispatcher(state) {
  const commands = {
    Up() {
      state.player.nextSpeedX = 0;
      state.player.nextSpeedY = -state.settings.defaultSpeed;
    },
    Down() {
      state.player.nextSpeedX = 0;
      state.player.nextSpeedY = state.settings.defaultSpeed;
    },
    Left() {
      state.player.nextSpeedX = -state.settings.defaultSpeed;
      state.player.nextSpeedY = 0;
    },
    Right() {
      state.player.nextSpeedX = state.settings.defaultSpeed;
      state.player.nextSpeedY = 0;
    },
  };

  function dispatch(command) {
    if (commands[command.type]) {
      commands[command.type](command);
    }
  }

  return { dispatch };
}

function createKeyboardListener(addEventListener) {
  addEventListener("keydown", handleKeyPress);

  const subscriptions = [];

  const commands = {
    ArrowUp: { type: "Up" },
    ArrowDown: { type: "Down" },
    ArrowLeft: { type: "Left" },
    ArrowRight: { type: "Right" },
    w: { type: "Up" },
    s: { type: "Down" },
    a: { type: "Left" },
    d: { type: "Right" },
  };

  function handleKeyPress(event) {
    if (commands[event.key]) {
      const command = commands[event.key];

      subscriptions.forEach((subscription) => subscription(command));
    } else {
      console.log("pressed key", event.key);
    }
  }

  function subscribe(callback) {
    subscriptions.push(callback);
  }

  return { subscribe };
}

export default createGame;
