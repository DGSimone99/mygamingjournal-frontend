import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import GameCard from "../game-card/GameCard";
import { fetchGames } from "../../redux/actions";
import PaginationControls from "./PaginationControls";

function QueryCatalog({ query, queryType, order, grid, size = 12, slice, number, param, paramType }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const [games, setGames] = useState([]);
  const fetchedGames = useSelector((state) => state.games.games);
  const [page, setPage] = useState(0);
  const [totalPages] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const params = {
        order: order || null,
        page,
        size,
      };

      if (query && queryType) {
        params[queryType] = query;
      }

      try {
        const response = await axios.get("/api/games", { params });
        setGames(response.data.content);
      } catch (error) {
        console.error("Error fetching games", error);
      }
    };

    if (!param && !paramType) {
      fetch();
    } else {
      dispatch(
        fetchGames({
          [paramType]: param,
          order: order || null,
          page,
          size,
        })
      );
    }
  }, [query, queryType, param, paramType, order, page, size, dispatch]);

  const renderGameList = (list) => (
    <Row className="px-4">
      {list.slice(0, slice).map((game) => (
        <GameCard
          game={game}
          key={game.id}
          grid={grid}
          number={number}
          param={param}
          paramType={paramType}
          page={page}
          size={size}
        />
      ))}
    </Row>
  );

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mt-2">{query?.toUpperCase()}</h2>
        {(location.pathname === "/catalog" || location.pathname === "/catalog/") && (
          <Button
            as={Link}
            to={`/catalog/${queryType}/${query}`}
            className="text-secondary pointer-underline bg-transparent border-0"
          >
            Show more
          </Button>
        )}
      </div>
      {param && paramType ? (
        <>
          <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
          {paramType === "genre" && <h2>{param.toUpperCase()}</h2>}
          {renderGameList(fetchedGames)}
        </>
      ) : (
        <>{renderGameList(games)}</>
      )}
    </Container>
  );
}

export default QueryCatalog;
