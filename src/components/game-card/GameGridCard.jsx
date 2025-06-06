import { Card, Col } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import platformIcons from "../../utils/platformIcons.jsx";

function GameGridCard({ game, number }) {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.token));
  const gameEntryIds = useSelector((state) => state.gameEntryIds || []);

  const isGameInUserList = useMemo(() => {
    return isLoggedIn && gameEntryIds.includes(game.id);
  }, [isLoggedIn, gameEntryIds, game.id]);

  const getReleaseLabel = (game) => {
    if (!game.released) return "TBA";
    if (new Date(game.released) > new Date()) return "Coming Soon";
    return null;
  };

  const releaseLabel = getReleaseLabel(game);

  const navigate = useNavigate();

  return (
    <Col md={12 / number} className="mb-3 mt-2 pointer-big" key={game.id}>
      <Card
        as={Link}
        to={`/game/${game.id}`}
        className="shadow bg-card color-text h-100 rounded-4 text-decoration-none"
      >
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={game.backgroundImage}
            style={{ height: "12em", objectFit: "cover" }}
            className="rounded-top-4"
          />
          {releaseLabel && <div className="coming-soon-overlay">{releaseLabel}</div>}
          <div className="d-flex justify-content-between align-items-center mt-1 mx-3">
            <div className="d-flex align-items-center gap-2">
              {game?.parentPlatforms?.map((platform, index) => {
                const icon = platformIcons[platform];
                return icon ? <div key={index}>{icon}</div> : null;
              })}
            </div>
            <div className="d-flex align-items-center gap-2">
              {isGameInUserList ? <StarFill style={{ fill: "var(--added)" }} /> : <Star />}
              <span>{game.rating}</span>
            </div>
          </div>
        </div>
        <Card.Body>
          <Card.Title className="my-0" title={game.name}>
            {game?.name}
          </Card.Title>
          <Card.Text
            className="my-0 text-secondary pointer-underline"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate(`/catalog/developers/${game?.developers?.[0]}`);
            }}
          >
            {game?.developers?.[0] || "Unknown Developer"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default GameGridCard;
