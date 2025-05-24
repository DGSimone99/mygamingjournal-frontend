import { Card, Col, Image, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router";
import platformIcons from "../../assets/platformIcons.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function GameCard({ game, grid, number }) {
  const gameEntries = useSelector((state) => state.gameEntries || []);

  const { isLoggedIn } = useAuth();
  const [userEntry, setUserEntry] = useState(null);

  useEffect(() => {
    const foundEntry = gameEntries.find((entry) => entry.gameEntryId == game.id);
    setUserEntry(foundEntry || null);
  }, [gameEntries, game]);
  const getReleaseLabel = (game) => {
    if (!game.released) return "TBA";
    if (new Date(game.released) > new Date()) return "Coming Soon";
    return null;
  };
  return grid ? (
    <Col md={12 / number} className="mb-4 mt-4 pointer-big" key={game.id}>
      <Card
        as={Link}
        to={`/game/${game.id}`}
        className="shadow bg-black color-text h-100 rounded-4 text-decoration-none"
      >
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={game.backgroundImage}
            style={{ height: "20em", objectFit: "cover" }}
            className="rounded-top-4"
          />
          {getReleaseLabel(game) && <div className="coming-soon-overlay">{getReleaseLabel(game)}</div>}
          <div className="d-flex justify-content-between align-items-center mt-1 mx-3">
            <div className="d-flex align-items-center gap-2">
              {game?.parentPlatforms?.map((parentPlatforms, index) => {
                const icon = platformIcons[parentPlatforms];
                return icon ? <div key={index}>{icon}</div> : null;
              })}
            </div>
            <div className="d-flex align-items-center gap-2">
              {userEntry && isLoggedIn ? <StarFill style={{ fill: "var(--color-added)" }} /> : <Star />}
              <span>{game.rating}</span>
            </div>
          </div>
        </div>
        <Card.Body>
          <Card.Title className="my-0">{game?.name}</Card.Title>
          <Card.Text className="my-0 text-secondary pointer-underline">{game?.developers?.[0]}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ) : (
    <Row
      as={Link}
      to={`/game/${game?.id}`}
      className="align-items-center py-3 pointer-list p-0 shadow-sm rounded-2 text-decoration-none border border-color my-1"
      key={game.id}
    >
      <Col md={1} className="p-0">
        <Image
          src={game?.backgroundImage}
          style={{ height: "3.5em", objectFit: "cover" }}
          className="w-100 ms-2 rounded-2"
        />
      </Col>
      <Col md="6" className="ms-2">
        <h2 className="mb-0">{game?.name}</h2>
        <Card.Text className="my-0 text-secondary pointer-underline">{game?.developers?.[0]}</Card.Text>
      </Col>
      <Col className="d-flex align-items-center gap-2">
        {game?.parentPlatforms?.map((parentPlatforms, index) => {
          const icon = platformIcons[parentPlatforms];
          return icon ? <div key={index}>{icon}</div> : null;
        })}
      </Col>
      <Col>
        {game?.released}
        <div>{getReleaseLabel(game) && <div className="coming-soon">{getReleaseLabel(game)}</div>}</div>
      </Col>
      <Col>
        <p className="text-light my-0 px-2 d-flex align-items-center ms-auto">
          <Star className="ms-auto me-2"></Star>
          {game.rating}
        </p>
      </Col>
    </Row>
  );
}

export default GameCard;
