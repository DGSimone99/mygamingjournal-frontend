import GameGridCard from "./GameGridCard.jsx";
import GameListCard from "./GameListCard.jsx";

function GameCard({ game, grid, number }) {
  return grid ? <GameGridCard game={game} number={number} /> : <GameListCard game={game} />;
}

export default GameCard;
