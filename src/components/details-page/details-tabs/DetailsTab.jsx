import { useState } from "react";
import { Link } from "react-router";
import platformIcons from "../../../assets/platformIcons.jsx";
import { Reddit } from "react-bootstrap-icons";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Container, Image } from "react-bootstrap";
import NoUser from "../../../assets/noPic.jpg";

function DetailsTab({ game }) {
  const [member, setMember] = useState(4);

  function GameRequirements({ requirements }) {
    if (!requirements || typeof requirements !== "string") {
      return null; // oppure <p>Requisiti non disponibili</p>
    }

    const htmlDescription = requirements
      .replace(/\n/g, "</p><p class='my-1'>")
      .replace(/(Minimum:)/g, "<h5>$1</h5>")
      .replace(/(Recommended:)/g, "<h5>$1</h5>");

    return <div className="game-description" dangerouslySetInnerHTML={{ __html: htmlDescription }} />;
  }

  return (
    <Container className="details-tab">
      <div className="mb-3">
        <Link to={game.redditUrl} target="_blank" rel="noreferrer">
          <Reddit className="fs-2" />
        </Link>
      </div>

      <div className="mb-3">
        <h3>Release Date:</h3>
        <p>{game?.released || "-"}</p>
      </div>

      <div className="d-flex align-items-center gap-3 mb-3">
        <h3 className="m-0">Platforms:</h3>
        <div className="d-flex fs-4 gap-3">
          {game.parentPlatforms.length > 0 ? (
            game.parentPlatforms.map((p, index) => {
              const icon = platformIcons[p];
              return icon ? <div key={index}>{icon}</div> : null;
            })
          ) : (
            <div>Loading...</div>
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
          <div className="pointer">
            {member < game.developmentTeam.length ? (
              <FaAngleDown onClick={() => setMember(game.developmentTeam.length)} />
            ) : (
              <FaAngleUp onClick={() => setMember(4)} />
            )}
          </div>
        </div>
        {game?.developmentTeam?.length > 0 ? (
          <>
            <div className="team d-flex gap-2 mt-3 flex-wrap">
              {game.developmentTeam.slice(0, member).map((dev) => (
                <div className="member d-flex align-items-center gap-3 rounded p-2 w-100" key={dev.id}>
                  <Image src={dev.image || NoUser} alt={dev.name} height={50} className="rounded rounded-circle" />
                  <div>
                    <h5>{dev.name}</h5>
                    <p>{dev.positions[0]?.charAt(0).toUpperCase() + dev.positions[0]?.slice(1)}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>Loading...</div>
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
          {game?.minimumRequirements && <GameRequirements requirements={game.minimumRequirements} />}
          {game?.recommendedRequirements && <GameRequirements requirements={game.recommendedRequirements} />}
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
