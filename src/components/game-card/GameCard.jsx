import GameGridCard from "./GameGridCard.jsx";
import GameListCard from "./GameListCard.jsx";

function GameCard({ game, grid, number, dlc }) {
  return grid ? <GameGridCard game={game} number={number} /> : <GameListCard game={game} dlc={dlc} />;
}

export default GameCard;
