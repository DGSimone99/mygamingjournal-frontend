import { Card, Col, Image, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import platformIcons from "../../utils/platformIcons.jsx";

function GameListCard({ game, dlc }) {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => Boolean(state.auth.token));
  const gameEntryIds = useSelector((state) => state.gameEntryIds || []);

  const isGameInUserList = useMemo(() => {
    return isLoggedIn && gameEntryIds.some((entry) => entry.gameId === game.id);
  }, [isLoggedIn, gameEntryIds, game.id]);

  const getReleaseLabel = (game) => {
    if (!game.released) return "TBA";
    if (new Date(game.released) > new Date()) return "Coming Soon";
    return null;
  };

  const releaseLabel = getReleaseLabel(game);

  return (
    <Row
      as={Link}
      to={`/game/${game?.id}`}
      className="align-items-center py-3 pointer-list p-0 shadow-sm rounded-2 text-decoration-none border border-card my-1 gx-2"
    >
      <Col xs={3} sm={2} md={1} className="p-0">
        <Image
          src={game?.backgroundImage}
          style={{ height: "3.5em", objectFit: "cover" }}
          className="w-100 ms-2 rounded-2"
          fluid
        />
      </Col>

      <Col xs={9} sm={4} md={5} lg={4} className="ms-3">
        <h5 className="mb-1 fw-bold text-white" title={game?.name}>
          {game?.name}
        </h5>
        {!dlc && (
          <Card.Text
            className="my-0 text-secondary pointer-underline d-none d-lg-block"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate(`/catalog/developers/${game?.developers?.[0]}`);
            }}
          >
            {game?.developers?.[0] || "Sviluppatore sconosciuto"}
          </Card.Text>
        )}
      </Col>

      <Col
        xs={6}
        md={3}
        lg={3}
        className="d-flex align-items-center justify-content-center gap-2 mt-2 mt-sm-0 d-none d-md-flex"
      >
        {game?.parentPlatforms?.map((platform, index) => {
          const icon = platformIcons[platform];
          return icon ? <div key={index}>{icon}</div> : null;
        })}
      </Col>

      <Col md={2} lg={2} className="text-secondary d-flex align-items-center justify-content-end d-none d-lg-block">
        <div>{game?.released}</div>
        {releaseLabel && <div className="coming-soon small">{releaseLabel}</div>}
      </Col>

      <Col xs={5} md={2} lg={1} className="d-flex align-items-center justify-content-end mt-2 mt-md-0">
        <p className="my-0 gap-1 d-flex align-items-center">
          {isGameInUserList ? <StarFill style={{ fill: "var(--added)" }} /> : <Star />}
          {game.rating}
        </p>
      </Col>
    </Row>
  );
}

export default GameListCard;
