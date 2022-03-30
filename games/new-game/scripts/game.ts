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

const pipes: GameObject[] = Array(10)
  .fill(0)
  .map((_, i) => ({
    sprite: "pipe",
    x: (i + 3) * 5,
    y: 0,
    width: 1,
    height: 5,
    enemy: true,
  }));

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
    { sprite: "grass", x: 0, y: 0, width: 100, height: 1, solid: true },
    ...pipes,
  ],
  gameOver: false,
};

const sprites: Record<string, string> = {
  player: "#ffffff08",
  grass: "#ffffff00",
  sky: "#ffffff00",
  pipe: "#ffffff08",
};

const render: Data["render"] = (state, screen, resolution) => {
  const shift = { x: 0, y: 0 }; // Parei aqui

  const objects = [...state.scene, state.player];
  objects.forEach((object) => {
    drawSprite(screen, object, resolution);
  });
};

const keyboardMap: Data["keyboardMap"] = {
  ArrowUp: { type: "Up" },
  w: { type: "Up" },
  " ": { type: "Up" },
};

const commands: Data["commands"] = {
  Up: (state) => {
    state.player.speedY = 0.3;
  },
};

const update: Data["update"] = (state) => {
  if (state.gameOver) {
    return;
  }

  state.player.speedY -= 0.01;
  state.player.speedX = 0.05;
  moveGameObject(state.player, state.scene);

  if (detectCollision(state.player, state.scene)) {
    state.gameOver = true;
  }
};

const moveGameObject = (obj: GameObject, others: GameObject[]) => {
  obj.x += obj.speedX || 0;
  obj.y += obj.speedY || 0;

  if (detectCollision(obj, others)) {
    obj.x -= obj.speedX || 0;
    obj.y -= obj.speedY || 0;
    obj.speedX = 0;
    obj.speedY = 0;
  }
  return obj;
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
