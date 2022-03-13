import { GameEngine, GameData, GameObject } from "./engine";

interface GameState {
  gameOver: boolean;
  player: {
    sprite: string;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
  };
  scene: GameObject[];
  settings: {
    defaultSpeed: 0.03;
  };
}

type Data = GameData<GameState>;

const state: GameState = {
  player: {
    x: 3,
    y: 13,
    speedX: 0,
    speedY: 0,
    sprite: "blackGirl",
  },
  scene: [
    { sprite: "grass", x: 0, y: 0, width: 10, height: 10 },
    { sprite: "grass", x: 10, y: 0, width: 10, height: 50 },
  ],
  gameOver: false,
  settings: {
    defaultSpeed: 0.03,
  },
};

const commands: Data["commands"] = {
  Up: () => {},
  Down: () => {},
  Left: () => {},
  Right: () => {},
};

const keyboardMap: Data["keyboardMap"] = {
  ArrowUp: { type: "Up" },
  ArrowDown: { type: "Down" },
  ArrowLeft: { type: "Left" },
  ArrowRight: { type: "Right" },
  w: { type: "Up" },
  s: { type: "Down" },
  a: { type: "Left" },
  d: { type: "Right" },
};

const translatePos = (rel: number, size: number) => (rel / 1000) * size;

const render: Data["render"] = (state, screen, resolution) => {
  state.scene.forEach((object) => {
    screen.fillStyle = "green";
    screen.fillRect(
      translatePos(object.x, resolution.width),
      translatePos(object.y, resolution.height),
      translatePos(object.width, resolution.width),
      translatePos(object.height, resolution.height)
    );
  });
};

const update: Data["update"] = (state) => {
  if (!state.gameOver) {
  }
};

export const createGame = (canvas: HTMLCanvasElement) => {
  canvas.width = 500;
  canvas.height = 500;

  const gameData: Data = {
    canvas,
    commands,
    keyboardMap,
    render,
    state,
    update,
  };

  const engine = new GameEngine(gameData);
};
