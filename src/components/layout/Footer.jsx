import { Container, Row, Col, Badge } from "react-bootstrap";

function Footer() {
  return (
    <footer className="py-4 topbar-footer">
      <Container>
        <Row className="text-center">
          <Col>
            <p className="mb-2">&copy; 2025 MyGamingJournal. All rights reserved.</p>

            <p className="mb-2">
              Data provided by:{" "}
              <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer">
                RAWG.io
              </a>
              ,{" "}
            </p>

            <p className="mb-2">
              Realizzato con:{" "}
              <Badge bg="secondary" className="mx-1">
                React
              </Badge>
              <Badge bg="secondary" className="mx-1">
                Spring Boot
              </Badge>
              <Badge bg="secondary" className="mx-1">
                JWT
              </Badge>
              <Badge bg="secondary" className="mx-1">
                Bootstrap
              </Badge>
            </p>

            <p>
              <a href="https://github.com/DGSimone99" target="_blank" rel="noreferrer">
                GitHub
              </a>{" "}
              | <a href="#">Privacy Policy</a> | <a href="#">Contacts</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
