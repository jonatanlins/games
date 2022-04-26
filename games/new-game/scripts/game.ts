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

const pipes: GameObject[] = Array(21)
  .fill(0)
  .flatMap((_, i) => {
    const pipe = { sprite: "pipe", x: (i + 2) * 7, width: 1, enemy: true };
    const hole = Math.random() * 7 + 4;
    const size = 2;
    return [
      { ...pipe, y: 0, height: hole - size },
      { ...pipe, y: hole + size, height: 15 - hole - size },
    ];
  });

const state: GameState = {
  player: {
    x: 2,
    y: 10,
    width: 1,
    height: 1,
    speedX: 0,
    speedY: 0,
    sprite: "player",
  },
  scene: [
    {
      sprite: "sky",
      x: -50,
      y: 0,
      width: Number.MAX_SAFE_INTEGER,
      height: 100,
    },
    {
      sprite: "grass",
      x: -50,
      y: 0,
      width: Number.MAX_SAFE_INTEGER,
      height: 1,
      solid: true,
    },
    ...pipes,
  ],
  gameOver: false,
};

const sprites: Record<string, string> = {
  player: "#f00",
  grass: "#0f0",
  sky: "#00f",
  pipe: "#fff",
};

const render: Data["render"] = (state, screen, resolution) => {
  const camera = { x: state.player.x - 5, y: 0 };

  const objects = [...state.scene, state.player];
  objects.forEach((object) => {
    drawSprite(screen, object, camera, resolution);
  });
};

const keyboardMap: Data["keyboardMap"] = {
  ArrowUp: { type: "Up" },
  w: { type: "Up" },
  " ": { type: "Up" },
};

const commands: Data["commands"] = {
  Up: (state) => {
    state.player.speedY = 0.1;
  },
};

const update: Data["update"] = (state) => {
  if (state.gameOver) {
    return;
  }

  state.player.speedY -= 0.003;
  state.player.speedX = 0.03;
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
  camera: { x: number; y: number },
  resolution: { width: number; height: number }
) => {
  screen.fillStyle = sprites[obj.sprite];
  screen.fillRect(
    ((obj.x - camera.x) / 15) * resolution.width,
    ((15 - obj.y - obj.height + camera.y) / 15) * resolution.height,
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
