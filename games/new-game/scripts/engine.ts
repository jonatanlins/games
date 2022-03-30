export interface Command<T = string, P = object> {
  type: T;
  payload?: P;
}

export interface GameObject {
  sprite: string;
  x: number;
  y: number;
  speedY?: number;
  speedX?: number;
  width: number;
  height: number;
  solid?: boolean;
  enemy?: boolean;
}

export interface GameData<S> {
  state: S;
  canvas: HTMLCanvasElement;
  update: (state: S) => void;
  render: (
    state: S,
    screen: CanvasRenderingContext2D,
    resolution: { width: number; height: number }
  ) => void;
  commands: Record<string, (state: S, payload?: object) => void>;
  keyboardMap: Record<string, Command>;
}

type GameFunctions = typeof defaultGameFunctions;

const defaultGameFunctions = {
  addEventListener: addEventListener.bind(window),
  requestAnimationFrame: requestAnimationFrame.bind(window),
  setInterval: setInterval.bind(window),
};

export class GameEngine<S> {
  constructor(
    private readonly data: GameData<S>,
    private readonly functions: GameFunctions = defaultGameFunctions
  ) {
    this.setup();
  }

  setup() {
    const screen = this.data.canvas.getContext("2d");
    if (!screen) throw new Error("Could not get 2d context");

    // @ts-ignore
    window.state = this.data.state; // for debug purposes

    this.renderGraphics(screen);

    this.createKeyboardListener();

    const frametime = 1000 / 120;
    this.functions.setInterval(this.data.update, frametime, this.data.state);
  }

  renderGraphics(screen: CanvasRenderingContext2D) {
    const { width, height } = this.data.canvas;
    screen.clearRect(0, 0, width, height);

    this.data.render(this.data.state, screen, { width, height });

    this.functions.requestAnimationFrame(() => this.renderGraphics(screen));
  }

  dispatchCommand(command: Command) {
    const commandFn = this.data.commands[command.type];
    commandFn?.(this.data.state, command.payload);
  }

  createKeyboardListener() {
    const handleKeyPress = (event: { key: string }) => {
      const command = this.data.keyboardMap[event.key];
      if (command) {
        this.dispatchCommand(command);
      } else {
        console.log("unhandled key", event.key);
      }
    };

    this.functions.addEventListener("keydown", handleKeyPress);
  }
}
