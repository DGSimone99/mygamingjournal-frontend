import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router";

import QueryCatalog from "./QueryCatalog";
import SearchControls from "./SearchControls";

function CatalogPage() {
  const [number] = useState(6);
  const [order, setOrder] = useState("-rating");
  const [query, setQuery] = useState("");
  const [grid, setGrid] = useState(true);
  const [queryType, setQueryType] = useState("query");
  const location = useLocation();
  const [title, setTitle] = useState(null);
  const [type, setType] = useState(null);

  const { genre } = useParams();

  const renderCatalogsByGenre = () => {
    const genres = ["action", "adventure", "rpg", "shooter", "strategy"];
    return genres.map((genre) => (
      <QueryCatalog key={genre} number={number} queryType="genre" query={genre} grid={grid} order={order} size={6} />
    ));
  };
  const isSpecialPage = location.pathname === "/catalog/top" || location.pathname === "/catalog/new";
  const isComingPage = location.pathname === "/catalog/coming";

  useEffect(() => {
    if (location.pathname === "/catalog/") {
      setQueryType("query");
      setQuery("");
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/catalog/top") {
      setOrder("-rating");
      setTitle("Top Rated");
    } else if (location.pathname === "/catalog/new") {
      setOrder("-released");
      setTitle("New Releases");
    } else if (isComingPage) {
      setType("coming");
      setTitle("Coming Soon");
    } else {
      setOrder("");
      setType(null);
    }
  }, [location]);

  return (
    <Container fluid className="page">
      <div className="mx-5 px-5">
        <SearchControls
          query={query}
          setQuery={setQuery}
          queryType={queryType}
          setQueryType={setQueryType}
          order={order}
          setOrder={setOrder}
          setGrid={setGrid}
        />

        {query ? (
          <QueryCatalog number={number} queryType={queryType} query={query} grid={grid} order={order} size={12} />
        ) : genre ? (
          <QueryCatalog number={number} genre={genre} grid={grid} order={order} size={12} />
        ) : isSpecialPage ? (
          <QueryCatalog number={number} grid={grid} order={order} size={12} title={title} />
        ) : isComingPage ? (
          <QueryCatalog number={number} grid={grid} order={"-rating"} size={12} title={title} type={type} />
        ) : (
          <div className="page-catalog">{renderCatalogsByGenre()}</div>
        )}
      </div>
    </Container>
  );
}

export default CatalogPage;
