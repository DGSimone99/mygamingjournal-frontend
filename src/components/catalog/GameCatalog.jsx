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
      const params = {
        order: props.order || null,
        page,
        size,
      };

      if (props.query && props.queryType) {
        params[props.queryType] = props.query;
      }

      const response = await axios.get("/api/games", { params });
      setGames(response.data.content);
    };

    fetch();
  }, [props.query, props.queryType, props.order, page, size]);

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center">
        <h2>{props?.query?.toUpperCase()}</h2>
        {location.pathname === "/catalog" && (
          <Button
            as={Link}
            to={`/catalog/${props.queryType}/${props.query}`}
            className="text-secondary pointer-underline bg-transparent border-0"
          >
            Show more
          </Button>
        )}
      </div>

      <Row className=" px-4">
        {games?.slice(0, props.slice).map((game) => {
          return <GameCard game={game} key={game.id} grid={props.grid} />;
        })}
      </Row>
      <hr></hr>
    </Container>
  );
}

export default GameCatalog;
