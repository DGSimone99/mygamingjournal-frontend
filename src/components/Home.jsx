import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { Steam } from "react-bootstrap-icons";
import { Link } from "react-router";
import LogoCompleto from "../assets/logoCompleto.png";

function Home() {
  return (
    <Container fluid className="page">
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

      <Row className="mb-5">
        <h2 className="mb-4">Hot Games</h2>
        <Col md={3}>
          <Card className="shadow-sm bg-black text-dark-custom h-100">
            <div>
              <Card.Img variant="top" src="https://m.media-amazon.com/images/I/71GPiuyNtkL._AC_UF894,1000_QL80_.jpg" />
              <p className="position-absolute top-0 end-0 m-1 bg-dark text-light rounded py-1 px-2 d-flex align-items-center">
                <Steam className="ms-1 me-2"></Steam>50k
              </p>
            </div>
            <Card.Body className="d-flex align-items-center">
              <div>
                <Card.Title className="my-0">Elden Ring</Card.Title>
                <p className="my-0">From Software</p>
              </div>
              <Button as={Link} to="/catalog/*" variant="outline-secondary" className="ms-auto">
                Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
