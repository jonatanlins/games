import React from "react";

const games = [
  {
    id: "laura-runner",
    name: "Laura Runner",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "pac-laura",
    name: "Pac-Laura",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "game-of-life",
    name: "Game of Life",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "flappy-julia",
    name: "Flappy Júlia",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
];

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="section">
        <h1>Games</h1>

        <ul className="game-list">
          {games.map((game) => (
            <li key={game.id}>
              <a href={`/games/${game.id}/`}>
                <img src={game.image} alt={game.name} />
                <div className="label">{game.name}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
