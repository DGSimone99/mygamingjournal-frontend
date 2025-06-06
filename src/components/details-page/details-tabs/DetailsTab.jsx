import { useState } from "react";
import { Link } from "react-router-dom";
import { Reddit } from "react-bootstrap-icons";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Container, Image } from "react-bootstrap";
import platformIcons from "../../../utils/platformIcons.jsx";
import NoUser from "../../../assets/NoUser.png";

function GameRequirements({ requirements }) {
  if (!requirements || typeof requirements !== "string") return null;

  const html = requirements
    .replace(/\n/g, "</p><p class='my-1'>")
    .replace(/(Minimum:)/g, "<h5>$1</h5>")
    .replace(/(Recommended:)/g, "<h5>$1</h5>");

  return <div className="game-description" dangerouslySetInnerHTML={{ __html: html }} />;
}

function DetailsTab({ game }) {
  const [member, setMember] = useState(4);

  const toggleTeamView = () => {
    setMember(member < game.developmentTeam?.length ? game.developmentTeam.length : 4);
  };

  return (
    <Container className="details-tab">
      {game?.redditUrl && (
        <div className="mb-3">
          <Link to={game?.redditUrl || "#"} target="_blank" rel="noreferrer">
            <Reddit className="fs-2" />
          </Link>
        </div>
      )}

      <div className="mb-3">
        <h3>Release Date:</h3>
        <p>{game?.released || "-"}</p>
      </div>

      <div className="d-flex align-items-center gap-3 mb-3">
        <h3 className="m-0">Platforms:</h3>
        <div className="d-flex fs-4 gap-3 flex-wrap">
          {game?.parentPlatforms?.length ? (
            game.parentPlatforms.map((platform, index) => {
              const icon = platformIcons[platform];
              return icon ? (
                <span
                  key={index}
                  className="d-flex align-items-center gap-2 fs-5 px-2 py-1 border border-secondary rounded-3 bg-dark shadow-sm"
                  style={{ fontSize: "0.9rem" }}
                >
                  {icon}
                  <span className="fw-semibold fs-6">{platform}</span>
                </span>
              ) : null;
            })
          ) : (
            <span className="text-secondary">Loading...</span>
          )}
        </div>
      </div>

      <hr />

      <div className="mb-3">
        <h3>Developers:</h3>
        <p>{game?.developers?.join(", ") || "-"}</p>
      </div>

      <div className="mb-3">
        <h3>Publisher:</h3>
        <p>{game?.publishers?.join(", ") || "-"}</p>
      </div>

      <div className="mb-3 team-section">
        <div className="d-flex justify-content-between">
          <h3>Team:</h3>
          <div className="pointer" onClick={toggleTeamView}>
            {member < game?.developmentTeam?.length ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        </div>

        {game?.developmentTeam?.length ? (
          <div className="team d-flex gap-2 mt-3 flex-wrap">
            {game.developmentTeam.slice(0, member).map((dev) => (
              <div className="member d-flex align-items-center gap-3 rounded p-2 w-100" key={dev.id}>
                <Image
                  src={dev.image || NoUser}
                  alt={dev.name}
                  height={50}
                  width={50}
                  className="rounded-circle object-fit-cover"
                />
                <div>
                  <h5>{dev.name}</h5>
                  <p>{dev.positions?.[0]?.[0]?.toUpperCase() + dev.positions?.[0]?.slice(1) || "-"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary">Loading team info...</p>
        )}
      </div>

      <hr />

      <div className="mb-3">
        <h3>Genres:</h3>
        <p>{game?.genres?.join(", ") || "-"}</p>
      </div>

      {(game?.minimumRequirements || game?.recommendedRequirements) && (
        <div className="mt-4">
          <h3>System Requirements:</h3>
          {game.minimumRequirements && <GameRequirements requirements={game.minimumRequirements} />}
          {game.recommendedRequirements && <GameRequirements requirements={game.recommendedRequirements} />}
        </div>
      )}

      <hr />

      <div className="mb-3">
        <h5>Tags:</h5>
        <p>{game?.tags?.join(", ") || "-"}</p>
      </div>

      {game?.esrb_rating && (
        <div className="mb-3">
          <h3>Pegi:</h3>
          <p>{game.esrb_rating}</p>
        </div>
      )}
    </Container>
  );
}

export default DetailsTab;
