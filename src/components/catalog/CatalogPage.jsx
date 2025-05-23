import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { LayoutThreeColumns, List } from "react-bootstrap-icons";
import { useParams } from "react-router";
import GameCatalog from "./GameCatalog";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { Grid } from "react-bootstrap-icons";
function CatalogPage() {
  const number = 6;
  const [grid, setGrid] = useState(true);
  const [order, setOrder] = useState("-rating");
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("query");
  const { genre } = useParams();

  const isCatalogHome = !genre;

  function handleGrid() {
    setGrid(true);
  }

  function handleList() {
    setGrid(false);
  }

  const orderings = [
    { value: "name", label: "Alphabetical" },
    { value: "-released", label: "Released" },
    { value: "-rating", label: "Rating" },
  ];

  return (
    <Container fluid className="page">
      <div className="h-100 mx-5 px-5">
        <div className="d-flex align-items-center mb-3 border border-2 border-color rounded overflow-hidden">
          <Form.Control
            type="text"
            placeholder="Search"
            className="input-field-search border-0 rounded-0"
            value={query}
            onChange={(e) => {
              {
                setQuery(e.target.value);
              }
            }}
          />
          <Form.Select
            aria-label="Filter by"
            className="input-field-filter fw-bold border-0 border-start border-secondary"
            value={queryType}
            onChange={(e) => setQueryType(e.target.value)}
          >
            <option value={"query"}>Global</option>
            <option value={"name"}>Name</option>
            <option value={"developers"}>Developers</option>
            <option value={"publishers"}>Publishers</option>
          </Form.Select>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 fs-5">
          {isCatalogHome && (
            <div className="d-flex align-items-center gap-2">
              <Form.Select
                aria-label="Order by"
                className="input-field-filter fw-bold border border-color"
                value={order.replace("-", "")}
                onChange={(e) => {
                  const baseValue = e.target.value;
                  const isDesc = order.startsWith("-");
                  setOrder(isDesc ? `-${baseValue}` : baseValue);
                }}
              >
                {orderings.map((option) => (
                  <option key={option.value} value={option.value.replace("-", "")}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>

              {order.startsWith("-") ? (
                <TbTriangleFilled
                  onClick={() => setOrder(order.replace("-", ""))}
                  className="pointer color-text"
                  size={15}
                />
              ) : (
                <TbTriangleInvertedFilled
                  onClick={() => setOrder(`-${order}`)}
                  className="pointer  color-text"
                  size={15}
                />
              )}
            </div>
          )}

          <div className="ms-auto">
            <Grid
              onClick={handleGrid}
              className={`pointer text-secondary ${grid ? "color-text" : "color-text-secondary"}`}
            />
            <List onClick={handleList} className={`pointer ${grid ? "color-text-secondary" : "color-text"}`} />
          </div>
        </div>
        {!query ? (
          <div className="page-catalog">
            <GameCatalog number={number} slice={number} queryType="genre" query="action" grid={grid} order={order} />
            <GameCatalog number={number} slice={number} queryType="genre" query="adventure" grid={grid} order={order} />
            <GameCatalog number={number} slice={number} queryType="genre" query="rpg" grid={grid} order={order} />
            <GameCatalog number={number} slice={number} queryType="genre" query="shooter" grid={grid} order={order} />
            <GameCatalog number={number} slice={number} queryType="genre" query="strategy" grid={grid} order={order} />
          </div>
        ) : (
          <GameCatalog number={number} slice={number} queryType={queryType} query={query} grid={grid} order={order} />
        )}
      </div>
    </Container>
  );
}

export default CatalogPage;
