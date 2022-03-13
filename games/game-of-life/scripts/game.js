function createGame(canvas, requestAnimationFrame, setInterval) {
  function setup() {
    canvas.width = 200;
    canvas.height = 200;

    const screen = canvas.getContext("2d");

    const state = {
      population: [...Array(canvas.height)].map(() =>
        [...Array(canvas.width)].map(() => (Math.random() > 0.2 ? 1 : 0))
      ),
    };
    window.state = state; // for debug purposes

    render(screen, state, requestAnimationFrame);

    const commandDispatcher = createCommandDispatcher(state);
    const keyboardListener = createKeyboardListener(window.addEventListener);
    keyboardListener.subscribe(commandDispatcher.dispatch);

    const refreshRate = 1000 / 10;

    setInterval(update, refreshRate, state);
  }

  function countNeighbours(x, y, population) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const neighbourX = x + i;
        const neighbourY = y + j;

        if (
          neighbourX >= 0 &&
          neighbourX < population[0].length &&
          neighbourY >= 0 &&
          neighbourY < population.length
        ) {
          count += population[neighbourY][neighbourX];
        }
      }
    }

    return count;
  }

  function update(state) {
    const newPopulation = state.population.map((row, y) => {
      return row.map((cell, x) => {
        const neighbours = countNeighbours(x, y, state.population);

        if (neighbours <= 1) return 0;
        if (neighbours >= 4) return 0;
        if (neighbours === 3) return 1;
        return state.population[y][x];
      });
    });

    state.population = newPopulation;
  }

  function render(screen, state, requestAnimationFrame) {
    screen.clearRect(0, 0, canvas.width, canvas.height);

    screen.fillStyle = "#3a3a3a";

    state.population.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          screen.fillRect(x, y, 1, 1);
        }
      });
    });

    requestAnimationFrame(() => render(screen, state, requestAnimationFrame));
  }

  return { setup };
}

function createCommandDispatcher(state) {
  const commands = {};

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

  const commands = {};

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
