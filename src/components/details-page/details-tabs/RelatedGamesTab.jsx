import { useEffect } from "react";
import GameCard from "../../catalog/GameCard";
import { Container } from "react-bootstrap";

function RelatedGamesTab({ game }) {
  useEffect(() => {}, [game]);

  return (
    <Container className="p-4">
      {game?.dlcList?.length > 0 && (
        <div>
          <h2>DLC</h2>
          <div>
            {game.dlcList.map((dlc) => (
              <GameCard game={dlc} key={dlc.id} grid={false} number={-1} />
            ))}
          </div>
        </div>
      )}

      {game?.relatedGames?.length > 0 && (
        <div>
          <h2>Related Games</h2>
          <div>
            {game.relatedGames.map((related) => (
              <GameCard game={related} key={related.id} grid={false} number={-1} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

export default RelatedGamesTab;
