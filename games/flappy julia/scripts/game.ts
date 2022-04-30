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

interface Sprite {
  img: HTMLImageElement;
  sX: number;
  sY: number;
  sWidth: number;
  sHeight: number;
}

type Data = GameData<GameState>;

const pipes: GameObject[] = Array(100)
  .fill(0)
  .flatMap((_, i): GameObject[] => {
    const x = (i + 2) * 7;
    const pipe = { x, width: 1, height: 10, enemy: true };
    const hole = Math.random() * 7 + 4;
    const size = 2;

    if (i === 21 - 1) {
      return [
        {
          sprite: "cake",
          x: x - 2,
          y: 1,
          width: 5,
          height: 5,
        },
      ];
    }

    return [
      { ...pipe, sprite: "pipe_up", y: hole + size },
      { ...pipe, sprite: "pipe_down", y: hole - 10 - size },
    ];
  });

const backgrounds: GameObject[] = Array(1)
  .fill(0)
  .map((_, i) => ({
    sprite: "sky",
    x: (i - 1) * 20,
    y: 0,
    width: 20,
    height: 15,
  }));

const foregrounds: GameObject[] = Array(20)
  .fill(0)
  .map((_, i) => ({
    sprite: "grass",
    x: (i - 1) * 20,
    y: 0,
    width: 20,
    height: 1,
    enemy: true,
  }));

const state: GameState = {
  player: {
    x: 2,
    y: 10,
    width: 1,
    height: 57 / 79,
    speedX: 0,
    speedY: 0,
    sprite: "player",
  },
  scene: [...backgrounds, ...pipes, ...foregrounds],
  gameOver: false,
};

const spriteSheet1 = document.getElementById("sprites-01") as HTMLImageElement;
const spriteSheet2 = document.getElementById("sprites-02") as HTMLImageElement;

const sprites: Record<string, Sprite> = {
  player: {
    img: spriteSheet1,
    sX: 0,
    sY: 0,
    sWidth: 74,
    sHeight: 53,
  },
  sky: {
    img: spriteSheet2,
    sX: 0,
    sY: 0,
    sWidth: 600,
    sHeight: 450,
  },
  grass: {
    img: spriteSheet2,
    sX: 0,
    sY: 450,
    sWidth: 600,
    sHeight: 30,
  },
  pipe_up: {
    img: spriteSheet1,
    sX: 74 + 30,
    sY: 0,
    sWidth: 30,
    sHeight: 300,
  },
  pipe_down: {
    img: spriteSheet1,
    sX: 74,
    sY: 0,
    sWidth: 30,
    sHeight: 300,
  },
  cake: {
    img: spriteSheet1,
    sX: 74 + 30 + 30,
    sY: 0,
    sWidth: 62,
    sHeight: 62,
  },
};

const render: Data["render"] = (state, screen, resolution) => {
  const camera = { x: state.player.x - 5, y: 0 };

  const objects = [...state.scene, state.player];
  objects.forEach((object) => {
    drawSprite(screen, object, camera, resolution);
  });
};

const update: Data["update"] = (state) => {
  if (state.gameOver) return;

  state.player.speedY -= 0.003;
  state.player.speedX = 0.04;
  const { collision } = moveGameObject(state.player, state.scene);

  if (collision === "enemy") {
    state.gameOver = true;
  }
};

const keyboardMap: Data["keyboardMap"] = {
  ArrowUp: { type: "Up" },
  w: { type: "Up" },
  " ": { type: "Up" },
};

const commands: Data["commands"] = {
  Up: (state) => {
    if (state.gameOver) return;
    state.player.speedY = 0.1;
  },
};

const moveGameObject = (obj: GameObject, others: GameObject[]) => {
  obj.x += obj.speedX || 0;
  obj.y += obj.speedY || 0;

  const collision = detectCollision(obj, others);
  if (collision) {
    obj.x -= obj.speedX || 0;
    obj.y -= obj.speedY || 0;
    obj.speedX = 0;
    obj.speedY = 0;
  }
  return { obj, collision };
};

const detectCollision = (
  player: GameObject,
  objects: GameObject[]
): "solid" | "enemy" | null => {
  for (const obj of objects) {
    if (!obj.solid && !obj.enemy) continue;
    if (hasCollided(player, obj)) {
      if (obj.enemy) return "enemy";
      if (obj.solid) return "solid";
    }
  }
  return null;
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
  const sprite = sprites[obj.sprite];
  if (!sprite) return;
  screen.drawImage(
    sprite.img,
    sprite.sX,
    sprite.sY,
    sprite.sWidth,
    sprite.sHeight,
    obj.sprite === "sky" ? 0 : ((obj.x - camera.x) / 15) * resolution.width,
    ((15 - obj.y - obj.height + camera.y) / 15) * resolution.height,
    (obj.width / 15) * resolution.width,
    (obj.height / 15) * resolution.height
  );
};

export const createGame = (canvas: HTMLCanvasElement) => {
  const size = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = size;
  canvas.height = size;

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
