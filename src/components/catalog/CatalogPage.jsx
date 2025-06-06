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

  const { genre, developer } = useParams();

  const renderCatalogsByGenre = () => {
    const genres = ["action", "adventure", "rpg", "shooter", "strategy"];
    return genres.map((genre) => (
      <QueryCatalog
        key={genre}
        number={number}
        queryType="genre"
        query={genre}
        grid={grid}
        order={order}
        size={6}
        type={type}
      />
    ));
  };
  const isTopPage = location.pathname === "/catalog/top";
  const isNewPage = location.pathname === "/catalog/new";
  const isComingPage = location.pathname === "/catalog/coming";

  useEffect(() => {
    if (location.pathname === "/catalog/") {
      setQueryType("query");
      setQuery("");
      if (type !== null) setType(null);
    }
  }, [location]);

  useEffect(() => {
    if (isTopPage) {
      setOrder("-rating");
      setTitle("Top Rated");
      setType(null);
    } else if (isNewPage) {
      setOrder("-released");
      setTitle("New Releases");
      setType("-coming");
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
          type={type}
        />

        {query ? (
          <QueryCatalog
            number={number}
            queryType={queryType}
            query={query}
            grid={grid}
            order={order}
            size={12}
            type={type}
          />
        ) : genre ? (
          <QueryCatalog number={number} genre={genre} grid={grid} order={order} size={12} />
        ) : developer ? (
          <QueryCatalog number={number} grid={grid} order={order} size={12} title={developer} />
        ) : isTopPage ? (
          <QueryCatalog number={number} grid={grid} order={order} size={12} title={title} />
        ) : isNewPage ? (
          <QueryCatalog number={number} grid={grid} order={order} size={12} title={title} type={type} />
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
