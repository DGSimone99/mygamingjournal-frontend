import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Grid, List } from "react-bootstrap-icons";
import { BiSearch } from "react-icons/bi";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router";

const genres = [
  { slug: "action", name: "Action" },
  { slug: "indie", name: "Indie" },
  { slug: "adventure", name: "Adventure" },
  { slug: "role-playing-games-rpg", name: "RPG" },
  { slug: "strategy", name: "Strategy" },
  { slug: "shooter", name: "Shooter" },
  { slug: "casual", name: "Casual" },
  { slug: "simulation", name: "Simulation" },
  { slug: "puzzle", name: "Puzzle" },
  { slug: "arcade", name: "Arcade" },
  { slug: "platformer", name: "Platformer" },
  { slug: "racing", name: "Racing" },
  { slug: "sports", name: "Sports" },
  { slug: "fighting", name: "Fighting" },
  { slug: "family", name: "Family" },
  { slug: "board-games", name: "Board Games" },
  { slug: "educational", name: "Educational" },
  { slug: "card", name: "Card" },
];

function SearchControls({ query, setQuery, queryType, setQueryType, order, setOrder, setGrid }) {
  const [list, setList] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGrid = () => {
    setGrid(true);
    setList(false);
  };

  const handleList = () => {
    setGrid(false);
    setList(true);
  };

  const toggleOrderDirection = () => {
    if (order.startsWith("-")) {
      setOrder(order.replace("-", ""));
    } else {
      setOrder(`-${order}`);
    }
  };

  const orderings = [
    { value: "name", label: "Alphabetical" },
    { value: "-released", label: "Released" },
    { value: "-rating", label: "Rating" },
  ];

  const handleGenreSelect = (e) => {
    const selected = e.target.value;
    if (selected === "") {
      navigate("/catalog");
    } else {
      navigate(`/catalog/genre/${selected}`);
    }
  };

  useEffect(() => {
    if (!order) {
      setOrder("-rating");
    }
  }, [order]);

  return (
    <div className="search-controls">
      <div className="d-flex align-items-center mb-2 border border-1 border-card rounded overflow-hidden bg-dark">
        <Form.Select
          aria-label="Filter by"
          className="input-field-filter fw-bold border-0 border-start border-secondary"
          value={queryType}
          onChange={(e) => setQueryType(e.target.value)}
        >
          <option value="query">Global</option>
          <option value="name">Name</option>
          <option value="developers">Developers</option>
          <option value="publishers">Publishers</option>
        </Form.Select>

        <BiSearch className="ms-2 fs-3" />

        <Form.Control
          type="text"
          placeholder="Search"
          className="input-field-search border-0 rounded-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Form.Select
          aria-label="Genre"
          className="input-field-filter fw-bold border-0 border-end border-secondary"
          onChange={handleGenreSelect}
          value={location.pathname.startsWith("/catalog/genre/") ? location.pathname.split("/").pop() : ""}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.slug} value={genre.slug}>
              {genre.name}
            </option>
          ))}
        </Form.Select>
      </div>

      <div className="d-flex justify-content-between align-items-center fs-5">
        <div className="d-flex align-items-center gap-2">
          <Form.Select
            aria-label="Order by"
            className="input-field-filter fw-bold border border-dark"
            value={order.replace("-", "")}
            onChange={(e) => {
              const base = e.target.value;
              const isDesc = order.startsWith("-");
              setOrder(isDesc ? `-${base}` : base);
            }}
          >
            {orderings.map((option) => (
              <option key={option.value} value={option.value.replace("-", "")}>
                {option.label}
              </option>
            ))}
          </Form.Select>

          {order.startsWith("-") ? (
            <TbTriangleFilled onClick={toggleOrderDirection} className="pointer color-text" size={15} />
          ) : (
            <TbTriangleInvertedFilled onClick={toggleOrderDirection} className="pointer color-text" size={15} />
          )}
        </div>

        <div className="ms-auto">
          <Grid
            onClick={handleGrid}
            className={`pointer text-secondary ${!list ? "color-text" : "color-text-secondary"}`}
          />
          <List onClick={handleList} className={`pointer ${!list ? "color-text-secondary" : "color-text"}`} />
        </div>
      </div>
    </div>
  );
}

export default SearchControls;
