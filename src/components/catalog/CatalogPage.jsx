import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";

import QueryCatalog from "./QueryCatalog";
import SearchControls from "./SearchControls";

function CatalogPage() {
  const [number] = useState(6);
  const [order, setOrder] = useState("-rating");
  const [query, setQuery] = useState("");
  const [grid, setGrid] = useState(true);
  const [queryType, setQueryType] = useState("query");
  const { paramType, param } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const renderCatalogsByGenre = () => {
    const genres = ["action", "adventure", "rpg", "shooter", "strategy"];
    return genres.map((genre) => (
      <QueryCatalog key={genre} number={number} queryType="genre" query={genre} grid={grid} order={order} size={6} />
    ));
  };

  useEffect(() => {
    if (param && paramType) {
      setQuery(param);
      setQueryType(paramType);
    }

    if (location.pathname === "/catalog/") {
      setQueryType("query");
      setQuery("");
    }
  }, [param, paramType, navigate]);

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
        ) : param && paramType ? (
          <div>
            <QueryCatalog number={number} paramType={paramType} param={param} grid={grid} order={order} size={12} />
          </div>
        ) : (
          <div className="page-catalog">{renderCatalogsByGenre()}</div>
        )}
      </div>
    </Container>
  );
}

export default CatalogPage;
