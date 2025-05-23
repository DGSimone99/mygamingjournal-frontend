import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import axios from "axios";
import GameCard from "./GameCard";

function GameCatalog(props) {
  const location = useLocation();
  const [games, setGames] = useState([]);
  const [page] = useState(0);
  const size = props.size || 18;

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("/api/games", {
        params: { genre: props.genre, order: props.order, page, size },
      });
      setGames(response.data.content);
    };

    fetch();
  }, [props.genre, props.order, page, size]);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h2>{props?.genre?.toUpperCase()}</h2>
        {location.pathname === "/catalog" && (
          <Button
            as={Link}
            to={`/catalog/${props.genre}`}
            className="text-secondary pointer-underline bg-transparent border-0"
          >
            Show more
          </Button>
        )}
      </div>

      <Row>
        {games?.slice(0, props.slice).map((game) => {
          return <GameCard game={game} key={game.id} grid={props.grid} />;
        })}
      </Row>
      <hr></hr>
    </Container>
  );
}

export default GameCatalog;
