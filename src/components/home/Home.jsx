import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router";
import LogoCompleto from "../../assets/logoCompleto.png";
import QueryCatalog from "../catalog/QueryCatalog";
import { useState } from "react";

function Home() {
  const [number] = useState(3);
  const [order] = useState("-rating");
  const [grid] = useState(true);
  const [type] = useState(null);
  const [size] = useState(6);
  const renderCatalogsByGenre = () => {
    const genres = ["action", "rpg", "adventure", "shooter"];
    return (
      <Row>
        {genres.map((genre) => (
          <Col xs={6} className="mb-3" key={genre}>
            <QueryCatalog
              number={number}
              queryType="genre"
              query={genre}
              grid={grid}
              order={order}
              size={size}
              type={type}
              style={20}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container fluid className="page px-4">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4">Welcome to</h1>
          <Image src={LogoCompleto} alt="Logo" className="mb-4" height={200} />

          <p className="lead">Keep track of your games, discover new titles, and share your experience with friends!</p>
          <Button as={Link} to="/catalog" variant="outline-secondary" size="lg">
            Explore the catalog
          </Button>
        </Col>
      </Row>

      <section className="mb-5">
        <QueryCatalog order="-rating" number={6} size={6} grid={true} title={"Top Games"} style={20} />
      </section>

      <section className="mb-5">
        <QueryCatalog
          order="-released"
          number={6}
          size={6}
          grid={true}
          title={"New Releases"}
          type={"-coming"}
          style={20}
        />
      </section>

      <section className="mb-5">
        <QueryCatalog
          queryType=""
          query=""
          order="-rating"
          number={6}
          size={6}
          grid={true}
          title={"Coming Soon"}
          type="coming"
          style={2}
        />
      </section>

      <section className="mb-5">
        <h2 className="mb-3">Popular Genres</h2>
        <div className="page-catalog">{renderCatalogsByGenre()}</div>
      </section>
    </Container>
  );
}

export default Home;
