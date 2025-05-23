import { useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { LayoutThreeColumns, List } from "react-bootstrap-icons";
import GenericCatalog from "./GenericCatalog";
import { Route, Routes, useParams } from "react-router";
import GenreCatalog from "./GenreCatalog";

function MainCatalog() {
  const number = 6;
  const [grid, setGrid] = useState(true);
  const [order, setOrder] = useState("-rating");
  const { genre } = useParams();

  const isCatalogHome = !genre;

  function handleGrid() {
    setGrid(true);
  }

  function handleList() {
    setGrid(false);
  }

  const orderings = [
    { value: "name", label: "Nome (A-Z)" },
    { value: "-name", label: "Nome (Z-A)" },
    { value: "released", label: "Più vecchi" },
    { value: "-released", label: "Più nuovi" },
    { value: "-rating", label: "Valutazione più alta" },
    { value: "rating", label: "Valutazione più bassa" },
  ];

  return (
    <Container fluid className="mt-3">
      <Container className="d-flex justify-content-between align-items-center mb-3 fs-5">
        {isCatalogHome && (
          <Dropdown>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className=" text-dark-custom">
              Order by
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark">
              <Dropdown.Item onClick={() => setOrder("-rating")} className="text-dark-custom fw-bold">
                Recommended
              </Dropdown.Item>
              <Dropdown.Divider />
              {orderings.map((option) => (
                <Dropdown.Item key={option.value} onClick={() => setOrder(option.value)} className="text-dark-custom">
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}

        <div>
          <LayoutThreeColumns
            onClick={handleGrid}
            color={grid ? "white" : "gray"}
            className="pointer"
          ></LayoutThreeColumns>
          <List onClick={handleList} color={grid ? "gray" : "white"} className="pointer"></List>
        </div>
      </Container>
      <Routes>
        <Route path="/" element={<GenericCatalog number={number} slice={number} grid={grid} order={order} />} />
        <Route path="/:genre" element={<GenreCatalog grid={grid} order={order} />} />
      </Routes>
    </Container>
  );
}

export default MainCatalog;
