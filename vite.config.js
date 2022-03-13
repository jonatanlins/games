const { resolve } = require("path");
const { defineConfig } = require("vite");

const entries = [
  "",
  "games/laura-runner",
  "games/pac-laura",
  "games/game-of-life",
];

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        entries.map((entry) => [
          entry,
          resolve(__dirname, `${entry}/index.html`),
        ])
      ),
    },
  },
});
