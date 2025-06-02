import { Card, Col, Image, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import platformIcons from "../../utils/platformIcons.jsx";
import { fetchUserGameEntries, fetchUserGameEntriesIds } from "../../redux/actions/gameEntryActions.js";

function GameListCard({ game, dlc }) {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    dispatch(fetchUserGameEntriesIds());
    dispatch(fetchUserGameEntries());
  }, [dispatch]);

  return (
    <Row
      as={Link}
      to={`/game/${game?.id}`}
      className="align-items-center py-3 pointer-list p-0 shadow-sm rounded-2 text-decoration-none border border-card my-1"
    >
      <Col md={1} className="p-0">
        <Image
          src={game?.backgroundImage}
          style={{ height: "3.5em", objectFit: "cover" }}
          className="w-100 ms-2 rounded-2"
        />
      </Col>
      <Col md="6" className="ms-2">
        <h2 className="mb-0" title={game?.name}>
          {game?.name}
        </h2>
        {!dlc && (
          <Card.Text
            className="my-0 text-secondary pointer-underline"
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
      <Col className="d-flex align-items-center gap-2">
        {game?.parentPlatforms?.map((platform, index) => {
          const icon = platformIcons[platform];
          return icon ? <div key={index}>{icon}</div> : null;
        })}
      </Col>
      <Col>
        <div>{game?.released}</div>
        {releaseLabel && <div className="coming-soon">{releaseLabel}</div>}
      </Col>
      <Col>
        <p className="my-0 px-2 gap-1 d-flex align-items-center ms-auto">
          {isGameInUserList ? <StarFill style={{ fill: "var(--added)" }} /> : <Star />}
          {game.rating}
        </p>
      </Col>
    </Row>
  );
}

export default GameListCard;
