interface Command<T = object> {
  type: string;
  payload?: T;
}

export interface GameObject {
  x: number;
  y: number;
  sprite: string;
  width: number;
  height: number;
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
  commands: Record<string, (payload?: object) => void>;
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

    const keyboardListener = this.createKeyboardListener();
    keyboardListener.subscribe(this.dispatchCommand.bind(this));

    this.functions.setInterval(this.data.update, 1000 / 120, this.data.state);
  }

  renderGraphics(screen: CanvasRenderingContext2D) {
    const { width, height } = this.data.canvas;
    screen.clearRect(0, 0, width, height);

    this.data.render(this.data.state, screen, { width, height });

    this.functions.requestAnimationFrame(() => this.renderGraphics(screen));
  }

  dispatchCommand(command: Command) {
    const commandFn = this.data.commands[command.type];
    commandFn?.(command.payload);
  }

  createKeyboardListener() {
    const subscriptions: Array<(command: Command) => void> = [];

    const handleKeyPress = (event: { key: string }) => {
      const command = this.data.keyboardMap[event.key];
      if (command) {
        subscriptions.forEach((subscription) => subscription(command));
      } else {
        console.log("unhandled key", event.key);
      }
    };

    this.functions.addEventListener("keydown", handleKeyPress);

    const subscribe = (callback: (command: Command) => void) => {
      subscriptions.push(callback);
    };

    return { subscribe };
  }
}
