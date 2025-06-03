import { useSelector } from "react-redux";
import GameCard from "../../game-card/GameCard";
import { Container } from "react-bootstrap";

function RelatedGamesTab() {
  const game = useSelector((state) => state.game.game || {});

  const renderSection = (title, gameList) => {
    if (!Array.isArray(gameList) || gameList.length === 0) return null;

    return (
      <div className="mb-4">
        <h2>{title}</h2>
        <div>
          {gameList.map((g) => (
            <GameCard dlc={true} game={g} key={g.id} grid={false} number={-1} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Container className="p-4">
      {renderSection("Parent Games", game.parentGames)}
      {renderSection("DLC", game.dlcList)}
      {renderSection("Related Games", game.relatedGames)}
    </Container>
  );
}

export default RelatedGamesTab;
