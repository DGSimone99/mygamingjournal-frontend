import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router";
import LogoCompleto from "../assets/logoCompleto.png";
import QueryCatalog from "./catalog/QueryCatalog";

function Home() {
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
        <QueryCatalog queryType="" query="" order="-rating" number={6} size={6} grid={true} title={"Top Games"} />
      </section>

      <section className="mb-5">
        <QueryCatalog queryType="" query="" order="-released" number={6} size={6} grid={true} title={"New Releases"} />
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
        />
      </section>

      <section className="mb-5">
        <h2 className="mb-3">Popular Genres</h2>
        <Row>
          {["action", "rpg", "adventure", "shooter"].map((genre) => (
            <Col key={genre} md={6}>
              <QueryCatalog queryType="genre" query={genre} order="-rating" number={3} size={3} grid={true} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default Home;
