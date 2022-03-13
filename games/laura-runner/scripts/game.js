function createGame(canvas, requestAnimationFrame, setInterval) {
  function setup() {
    canvas.width = 200;
    canvas.height = 100;

    const screen = canvas.getContext("2d");

    const state = {
      player: {
        x: 0,
        y: 0,
        speedX: 0.5,
        speedY: 0,
        sprite: "blackGirl",
        width: 10,
        height: 14,
      },
      settings: {},
      enemies: [],
    };
    window.state = state; // for debug purposes

    render(screen, state, requestAnimationFrame);

    const commandDispatcher = createCommandDispatcher(state);
    const keyboardListener = createKeyboardListener(window.addEventListener);
    keyboardListener.subscribe(commandDispatcher.dispatch);

    setInterval(update, 1000 / 120, state);
  }

  function update(state) {
    state.player.x += state.player.speedX;
    state.player.y += state.player.speedY;

    if (state.player.y > 0) {
      state.player.speedY -= 0.04;
    } else {
      state.player.speedY = 0;
      state.player.y = 0;
    }

    if (Math.random() < 0.005) {
      state.enemies.push({
        x: state.player.x + 300,
        y: 0,
        width: 14,
        height: 14,
      });
    }
    state.enemies = state.enemies.filter(
      (enemy) => enemy.x - state.player.x > -50
    );

    const gameOver = state.enemies.some(
      (enemy) =>
        Math.abs(enemy.x - state.player.x + 2 - 40) < 10 && state.player.y < 12
    );

    if (gameOver) {
      state.player.speedX = 0;
      state.player.speedY = 0;
    }
  }

  function render(screen, state, requestAnimationFrame) {
    screen.clearRect(0, 0, canvas.width, canvas.height);

    screen.fillStyle = "#3a3a3a";
    screen.fillRect(0, 90, 200, 1);

    renderSprite(screen, "blackGirl", 40, 76 - state.player.y);

    state.enemies.map((enemy) => {
      renderSprite(screen, "virus", enemy.x - state.player.x, 76 - enemy.y);
    });

    requestAnimationFrame(() => render(screen, state, requestAnimationFrame));
  }

  // prettier-ignore
  const sprites = {
    blackGirl: [
      [null, "#4e2418", "#4e2418"],
      [null, "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", null],
      [null, null, "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418"],
      ["#4e2418", "#4e2418", "#4e2418", "#4e2418", "#4e2418", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#4e2418"],
      ["#4e2418", "#4e2418", "#4e2418", "#4e2418", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b"],
      [null, "#4e2418", "#cb724b", "#4e2418", "#cb724b", "#300101", "#cb724b", "#cb724b", "#300101", "#cb724b"],
      ["#4e2418", "#4e2418", "#cb724b", "#cb724b", "#cb724b", "#300101", "#cb724b", "#cb724b", "#300101", "#cb724b"],
      ["#4e2418", "#4e2418", "#4e2418", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b", "#cb724b"],
      [null, null, null, null, "#de1d30", "#de1d30", "#de1d30", "#cb724b", "#de1d30"],
      [null, null, null, null, "#de1d30", "#de1d30", "#de1d30", "#de1d30", "#de1d30"],
      [null, null, null, null, "#cb724b", "#de1d30", "#de1d30", "#de1d30", "#de1d30"],
      [null, null, null, null, "#cb724b", "#de1d30", "#de1d30", "#de1d30", "#cb724b"],
      [null, null, null, null, null, "#303030", null, "#303030", null],
      [null, null, null, null, null, "#303030", null, "#303030", null],
    ],

    virus:[
      [null, null, null, null, null, '#74be0c', null, null, null, null, null, null, '#74be0c', null],
      [null, '#74be0c', '#74be0c', null, null, '#74be0c', '#74be0c', null, '#74be0c', null, null, '#74be0c', '#74be0c', null],
      [null, null, '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', null, null],
      [null, null, null, '#74be0c', '#82d80e', '#82d80e', '#82d80e', '#82d80e', '#82d80e', '#82d80e', '#74be0c', null, null, null],
      ['#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#82d80e', '#74be0c', '#82d80e', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', null],
      [null, null, '#74be0c', '#82d80e', '#82d80e', '#74be0c', '#82d80e', '#82d80e', '#82d80e', '#82d80e', '#82d80e', '#74be0c', null, null],
      [null, null, '#74be0c', '#82d80e', '#74be0c', '#82d80e', '#82d80e', '#74be0c', '#74be0c', '#82d80e', '#74be0c', '#74be0c', '#74be0c', '#74be0c'],
      [null, '#74be0c', '#74be0c', '#82d80e', '#82d80e', '#74be0c', '#82d80e', '#82d80e', '#82d80e', '#82d80e', '#74be0c', '#74be0c', null, null],
      [null, null, '#74be0c', '#82d80e', '#74be0c', '#74be0c', '#82d80e', '#74be0c', '#74be0c', '#82d80e', '#82d80e', '#74be0c', '#74be0c', '#74be0c'],
      ['#74be0c', '#74be0c', '#74be0c', '#82d80e', '#82d80e', '#82d80e', '#82d80e', '#82d80e', '#74be0c', '#82d80e', '#74be0c', '#74be0c', '#74be0c', null],
      [null, null, '#74be0c', '#74be0c', '#74be0c', '#82d80e', '#74be0c', '#82d80e', '#82d80e', '#82d80e', '#74be0c', null, null, null],
      [null, '#74be0c', '#74be0c', null, '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', '#74be0c', null, null],
      [null, '#74be0c', null, null, '#74be0c', null, '#74be0c', null, '#74be0c', '#74be0c', null, '#74be0c', null, null],
      [null, null, null, null, null, null, '#74be0c', null, null, null, null, null, null, null],
    ]
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
    Jump() {
      if (state.player.speedY === 0) {
        state.player.speedY = 1.5;
      }
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
    ArrowUp: { type: "Jump" },
    w: { type: "Jump" },
    " ": { type: "Jump" },
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
