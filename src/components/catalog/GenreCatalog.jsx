import { useParams } from "react-router";
import { useState } from "react";
import GameCatalog from "./GameCatalog";
import { Container } from "react-bootstrap";

function GenreCatalog(props) {
  const { genre } = useParams();
  const [slice, setSlice] = useState(18);
  const number = 6;

  function handleMore() {
    setSlice(slice + 12);
  }

  return (
    <>
      <GameCatalog number={number} slice={slice} genre={genre} grid={props.grid} order={props.order} />
      <Container onClick={handleMore} className="text-end text-secondary pointer-underline">
        Show more
      </Container>
    </>
  );
}

export default GenreCatalog;
