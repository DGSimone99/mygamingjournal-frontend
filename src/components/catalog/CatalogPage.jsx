import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

import QueryCatalog from "./QueryCatalog";
import SearchControls from "./SearchControls";

function CatalogPage() {
  const number = 6;
  const [order, setOrder] = useState("-rating");
  const [query, setQuery] = useState("");
  const [grid, setGrid] = useState(true);
  const [queryType, setQueryType] = useState("query");
  const { paramType, param } = useParams();
  const navigate = useNavigate();

  const renderCatalogsByGenre = () => {
    const genres = ["action", "adventure", "rpg", "shooter", "strategy"];
    return genres.map((genre) => (
      <QueryCatalog
        key={genre}
        number={number}
        slice={number}
        queryType="genre"
        query={genre}
        grid={grid}
        order={order}
      />
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
      <div className="h-100 mx-5 px-5">
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
          <QueryCatalog number={number} slice={20} queryType={queryType} query={query} grid={grid} order={order} />
        ) : param && paramType ? (
          <div className="page-catalog">
            <QueryCatalog number={number} slice={20} paramType={paramType} param={param} grid={grid} order={order} />
          </div>
        ) : (
          <div className="page-catalog">{renderCatalogsByGenre()}</div>
        )}
      </div>
    </Container>
  );
}

export default CatalogPage;
