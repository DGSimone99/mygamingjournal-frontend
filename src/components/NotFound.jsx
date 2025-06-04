import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router";
import PageNotFound from "../assets/PageNotFound.png";

function NotFound() {
  return (
    <Row className="text-center justify-content-center">
      <Col md={5} offset={5}>
        <Image src={PageNotFound} fluid alt="Page Not Found" style={{ maxHeight: "600px" }} />
        <Container className="d-flex justify-content-between">
          <Button as={Link} to="/" className="me-2 bg-transparent border-0 ms-3 fs-5 text-uppercase mgs-btn">
            Back to Home
          </Button>
          <Button as={Link} to="/catalog" className="me-2 bg-transparent border-0 fs-5 text-uppercase mgs-btn">
            Explore Games
          </Button>
        </Container>
      </Col>
    </Row>
  );
}

export default NotFound;
