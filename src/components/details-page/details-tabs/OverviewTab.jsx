import ModalGameEntry from "../ModalGameEntry.jsx";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { PeopleFill, Star, StarFill } from "react-bootstrap-icons";
import { fetchUserGameEntries } from "../../../redux/actions/gameEntryActions.js";
import ModalAvailablePlayers from "./ModalAvailablePlayers.jsx";
import { RiQuillPenAiFill, RiQuillPenAiLine } from "react-icons/ri";

function OverviewTab({ game }) {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.token));
  const dispatch = useDispatch();
  const { gameId } = useParams();

  const gameEntries = useSelector((state) => state.gameEntries || []);
  const [userEntry, setUserEntry] = useState(null);
  const [tab, setTab] = useState("Info");
  const [showModal, setShowModal] = useState(false);
  const [showAvailablePlayersModal, setShowAvailablePlayersModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserGameEntries());
  }, [dispatch]);

  useEffect(() => {
    const foundEntry = gameEntries.find((entry) => String(entry.gameId) === String(gameId));
    setUserEntry(foundEntry || null);
  }, [gameEntries, gameId]);

  useEffect(() => {
    if (tab === "Stats" && (!userEntry || !isLoggedIn)) {
      setTab("Info");
    }
  }, [tab, userEntry, isLoggedIn]);

  return (
    <Col md={12} lg={4} xl={3} className="overview-tab p-0">
      <Button className="tabs active w-100">Overview</Button>
      <Container className="p-3">
        <h1 className="fs-4 mb-2 fw-bold">{game?.name}</h1>
        <Image src={game?.backgroundImage} className="w-100 mb-2 rounded" alt="gameImage" />
        <div className="d-flex justify-content-between mb-2">
          <p className="d-flex align-items-center gap-2">
            <Star />
            {game?.rating != null ? `${game.rating} / 10` : "No rating"}
          </p>
          <div className="d-flex align-items-center">
            <PeopleFill className="me-2" />
            {game.added}
          </div>
        </div>
        {isLoggedIn && (
          <div>
            {userEntry ? (
              <div className="pointer-underline d-flex align-items-center" onClick={() => setShowModal(true)}>
                <RiQuillPenAiFill className="me-1 fs-5" />
                Edit
              </div>
            ) : (
              <div className="pointer-underline d-flex align-items-center" onClick={() => setShowModal(true)}>
                <RiQuillPenAiLine className="me-1 fs-5" />
                Add to List
              </div>
            )}
          </div>
        )}

        {isLoggedIn &&
          userEntry &&
          game?.gameModes?.some((mode) =>
            ["Multiplayer", "Multi-Player", "Online multiplayer", "Cross-Platform Multiplayer"].includes(mode)
          ) && (
            <Button
              className="w-100 mt-2 bg-transparent border-added primary-hover"
              onClick={() => setShowAvailablePlayersModal(true)}
            >
              Matchmaking
            </Button>
          )}

        <div className="d-flex mt-3">
          <Button
            className={`tabs w-100  ${tab === "Info" ? "active" : ""} ${
              isLoggedIn && userEntry ? "rounded-end-0" : ""
            }`}
            onClick={() => setTab("Info")}
          >
            Info
          </Button>
          {isLoggedIn && userEntry && (
            <Button
              className={`tabs w-100 rounded-start-0 ${tab === "Stats" ? "active" : ""}`}
              onClick={() => setTab("Stats")}
            >
              Your stats
            </Button>
          )}
        </div>

        {tab === "Info" && (
          <div className="mt-2">
            <h4>General Info:</h4>
            <h5>
              Developer:{" "}
              <span
                onClick={() => navigate(`/catalog/developers/${game?.developers?.[0]}`)}
                className="pointer-underline"
              >
                {game?.developers?.[0] || "-"}
              </span>
            </h5>
            <h5>
              Publisher:{" "}
              <span
                onClick={() => navigate(`/catalog/publishers/${game?.publishers?.[0]}`)}
                className="pointer-underline"
              >
                {game?.publishers?.[0] || "-"}
              </span>
            </h5>
            <h5>
              Release date: <span>{game?.released || "-"}</span>
            </h5>
            <h5 className="d-flex">
              Genre:
              <div className="ms-2 d-flex">
                {game?.genres?.slice(0, 3).map((genre, i, arr) => (
                  <span key={i} className="me-1 pointer-underline" onClick={() => navigate(`/catalog/genre/${genre}`)}>
                    {genre}
                    {i < arr.length - 1 && ","}
                  </span>
                ))}
              </div>
            </h5>
            <hr />
            <h4>Game Modes:</h4>
            <div>
              <h5>
                Singleplayer:{" "}
                <span>
                  {game?.gameModes?.some((mode) => ["Singleplayer", "Single-Player"].includes(mode)) ? "Yes" : "No"}
                </span>
              </h5>
              <h5>
                Multiplayer:{" "}
                <span>
                  {game?.gameModes?.some((mode) =>
                    ["Multiplayer", "Multi-Player", "Online multiplayer", "Cross-Platform Multiplayer"].includes(mode)
                  )
                    ? "Yes"
                    : "No"}
                </span>
              </h5>
            </div>
          </div>
        )}
        {userEntry && tab === "Stats" && (
          <div className="mt-2">
            <h5 className="d-flex align-items-center gap-2">
              Your rating: <StarFill style={{ fill: "var(--added)" }} />
              <span className="fw-normal">{userEntry?.personalRating}</span>
            </h5>
            <h5 className="d-flex align-items-center gap-2">
              Hours played:
              <span className="fw-normal">{userEntry?.hoursPlayed} hours</span>
            </h5>
            <h5 className="d-flex align-items-center gap-2">
              Status:
              <span className="fw-normal">{userEntry?.status}</span>
            </h5>
          </div>
        )}
      </Container>

      <ModalGameEntry gameId={game?.id} show={showModal} onHide={() => setShowModal(false)} existingGame={userEntry} />
      {showAvailablePlayersModal && (
        <ModalAvailablePlayers
          show={showAvailablePlayersModal}
          onHide={() => setShowAvailablePlayersModal(false)}
          game={game}
          userEntry={userEntry}
        />
      )}
    </Col>
  );
}

export default OverviewTab;
