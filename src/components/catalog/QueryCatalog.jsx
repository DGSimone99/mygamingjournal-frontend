import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import GameCard from "../game-card/GameCard";
import PaginationControls from "../common/PaginationControls";
import { fetchGames } from "../../redux/actions";

function QueryCatalog({ query, queryType, order, grid, number, size, title, type, style }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { genre, developer } = useParams();

  const [page, setPage] = useState(0);
  const set = genre || query || type || "default";

  const games = useSelector((state) => state.games.sets);
  const fetchedSet = games[set] || { games: [], totalPages: 0, currentPage: 0 };
  const [totalPages, setTotalPages] = useState(fetchedSet?.totalPages);

  const isTopPage = location.pathname === "/catalog/top";
  const isNewPage = location.pathname === "/catalog/new";

  useEffect(() => {
    let finalOrder = order;

    if (order?.includes("rating") && !order?.includes("metacritic")) {
      const isDesc = order.startsWith("-");
      finalOrder += isDesc ? ",-metacritic" : ",metacritic";
    }

    if (isTopPage || isNewPage || style === 20) {
      setTotalPages(20);
    } else if (style === 2) {
      setTotalPages(2);
    } else {
      setTotalPages(fetchedSet?.totalPages);
    }

    const params = {
      order: finalOrder,
      page,
      size,
      type,
    };

    if (genre) {
      params["genre"] = genre;
    } else if (developer) {
      params["developers"] = developer;
    } else if (query && queryType) {
      params[queryType] = query;
    }

    dispatch(fetchGames(set, params));
  }, [query, queryType, order, genre, page, size, dispatch]);

  const renderGameList = () => (
    <Row className="px-4">
      {fetchedSet.games?.slice(0, size).map((game) => (
        <GameCard game={game} key={game.id} grid={grid} number={number} />
      ))}
    </Row>
  );

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="mt-2 text-uppercase">{title || set}</h2>
        </Col>
        <Col className="mt-4">
          <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </Col>
        <Col className="text-end mt-4">
          {(location.pathname === "/catalog" || location.pathname === "/catalog/") && query && (
            <Button
              as={Link}
              to={`/catalog/genre/${query}`}
              className="text-secondary pointer-underline bg-transparent border-0"
            >
              Show more
            </Button>
          )}
        </Col>
      </Row>
      {renderGameList()}
    </Container>
  );
}

export default QueryCatalog;
