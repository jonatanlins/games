import { GameEngine, GameData, GameObject } from "./engine";

interface GameState {
  gameOver: boolean;
  player: {
    sprite: string;
    x: number;
    y: number;
    width: number;
    height: number;
    speedX: number;
    speedY: number;
  };
  scene: GameObject[];
}

type Data = GameData<GameState>;

const state: GameState = {
  player: {
    x: 2,
    y: 1.5,
    width: 1,
    height: 1,
    speedX: 0,
    speedY: 0,
    sprite: "player",
  },
  scene: [
    { sprite: "sky", x: 0, y: 0, width: 100, height: 100 },
    { sprite: "cloud", x: 1, y: 13.3, width: 3, height: 1 },
    { sprite: "cloud", x: 6, y: 13, width: 3, height: 1 },
    { sprite: "cloud", x: 11, y: 13.5, width: 3, height: 1 },
    { sprite: "grass", x: 0, y: 0, width: 100, height: 1, solid: true },
  ],
  gameOver: false,
};

const commands: Data["commands"] = {
  Up: (state) => {
    state.player.speedY = 0.3;
  },
  Down: (state) => {
    state.player.speedY = -0.3;
  },
  Right: (state) => {
    state.player.speedX = 0.1;
  },
  Left: (state) => {
    state.player.speedX = -0.1;
  },
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

const sprites: Record<string, string> = {
  player: "white",
  grass: "green",
  sky: "lightblue",
  cloud: "white",
};

const render: Data["render"] = (state, screen, resolution) => {
  const objects = [...state.scene, state.player];
  objects.forEach((object) => {
    drawSprite(screen, object, resolution);
  });
};

const update: Data["update"] = (state) => {
  if (state.gameOver) {
    return;
  }

  state.player.speedY -= 0.02;
  state.player.speedX *= 0.9;
  state.player.x += state.player.speedX;
  if (detectCollision(state.player, state.scene)) {
    state.player.x -= state.player.speedX;
    state.player.speedX = 0;
  }
  state.player.y += state.player.speedY;
  if (detectCollision(state.player, state.scene)) {
    state.player.y -= state.player.speedY;
    state.player.speedY = 0;
  }

  if (detectCollision(state.player, state.scene)) {
    state.gameOver = true;
  }
};

const detectCollision = (player: GameObject, objects: GameObject[]) => {
  return objects.some((obj) => obj.solid && hasCollided(player, obj));
};

const hasCollided = (obj1: GameObject, obj2: GameObject) => {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.height + obj1.y > obj2.y
  );
};

const drawSprite = (
  screen: CanvasRenderingContext2D,
  obj: GameObject,
  resolution: { width: number; height: number }
) => {
  screen.fillStyle = sprites[obj.sprite];
  screen.fillRect(
    (obj.x / 15) * resolution.width,
    ((15 - obj.y - obj.height) / 15) * resolution.height,
    (obj.width / 15) * resolution.width,
    (obj.height / 15) * resolution.height
  );
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
