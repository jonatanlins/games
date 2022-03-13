const { resolve } = require("path");
const { defineConfig } = require("vite");

const entries = ["", "games/pac-laura", "games/laura-runner"];

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
