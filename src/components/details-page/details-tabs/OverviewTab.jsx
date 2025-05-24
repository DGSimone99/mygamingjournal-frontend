import ModalGameEntry from "../ModalGameEntry.jsx";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { Badge, Button, Col, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { PeopleFill, Star, StarFill } from "react-bootstrap-icons";

import platformIcons from "../../../assets/platformIcons.jsx";

function OverviewTab({ game }) {
  const { isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const gameEntries = useSelector((state) => state.gameEntries || []);
  const { gameId } = useParams();

  const userEntry = gameEntries?.find((entry) => entry.gameEntryId == gameId);

  return (
    <Col md={3} className="overview-tab p-0">
      <Button className="tabs active w-100">Overview</Button>
      <Container className="p-3">
        <h1 className="fs-4 mb-2 fw-bold">{game?.name}</h1>
        <Image src={game?.backgroundImage} className="w-100 mb-2 rounded" alt="gameImage" />
        <div className="d-flex justify-content-between mb-2">
          <p className="d-flex align-items-center gap-2">
            <Star />
            {game.rating} / 10
          </p>
          <div className="d-flex align-items-center">
            <PeopleFill className="me-2" />
            {game.added}
          </div>
        </div>
        {isLoggedIn && (
          <p className="pointer-underline" onClick={() => setShowModal(true)}>
            {userEntry ? "Edit" : "Add to list"}
          </p>
        )}
        <hr />
        {userEntry && (
          <div>
            <h4>Personal Stats</h4>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <StarFill style={{ fill: "var(--color-added)" }} />
                {userEntry?.personalRating}
              </div>
              <div>{userEntry?.hoursPlayed} hours</div>
              <div>{userEntry?.status}</div>
            </div>
          </div>
        )}
        <h3>Info</h3>
        <h5>
          Developer: <span>{game?.developers?.[0] || "-"}</span>
        </h5>
        <h5>
          Publisher: <span>{game?.publishers?.[0] || "-"}</span>
        </h5>
        <h5>
          Release date: <span>{game?.released || "-"}</span>
        </h5>
        <h5 className="d-flex">
          Genre:
          <div className="ms-2 d-flex">
            {game?.genres?.slice(0, 3).map((genre, i, arr) => (
              <span key={i} className="me-1">
                {genre}
                {i < arr.length - 1 && ","}
              </span>
            ))}
          </div>
        </h5>
        <hr />
        <h3>Game Modes:</h3>
        <div>
          <h5>
            Singleplayer: <span>{game?.gameModes?.includes("Singleplayer") ? "Yes" : "No"}</span>
          </h5>
          <h5>
            Multiplayer: <span>{game?.gameModes?.includes("Multiplayer") ? "Yes" : "No"}</span>
          </h5>
        </div>
        <hr />
        <div className="info-block platforms d-flex align-items-center gap-2">
          <h3 className="m-0">Platforms:</h3>
          <div className="icons d-flex fs-2 gap-3">
            {game?.parentPlatforms?.length > 0 ? (
              game.parentPlatforms.map((p, index) => {
                const icon = platformIcons[p];
                return icon ? <div key={index}>{icon}</div> : null;
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </Container>

      <ModalGameEntry
        gameId={game?.id}
        show={showModal}
        onHide={() => setShowModal(false)}
        existingGame={gameEntries.find((entry) => entry.gameEntryId === parseInt(gameId))}
      />
    </Col>
  );
}

export default OverviewTab;
