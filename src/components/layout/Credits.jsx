import { Container, Row, Col, Badge } from "react-bootstrap";
import { FaGithub, FaReact, FaBootstrap, FaJava, FaKey } from "react-icons/fa";
import { RiExternalLinkLine } from "react-icons/ri";

function CreditsPage() {
  return (
    <Container className="pt-5 pb-5 page text-center">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="display-4 fw-bold mb-4 text-tertiary">Credits</h1>

          <p className="mb-4 text-secondary fs-5">
            &copy; {new Date().getFullYear()} <strong>MyGamingJournal</strong> — All rights reserved.
          </p>

          <h5 className="text-white mt-5 mb-3">Data Providers</h5>
          <p className="text-secondary">
            Powered by{" "}
            <a
              href="https://rawg.io/apidocs"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-underline text-info"
            >
              RAWG.io <RiExternalLinkLine size={14} />
            </a>
          </p>

          <h5 className="text-white mt-5 mb-3">Technologies Used</h5>
          <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
            <Badge bg="secondary" className="d-flex align-items-center gap-2 px-3 py-2 fs-6">
              <FaReact /> React
            </Badge>
            <Badge bg="secondary" className="d-flex align-items-center gap-2 px-3 py-2 fs-6">
              <FaJava /> Spring Boot
            </Badge>
            <Badge bg="secondary" className="d-flex align-items-center gap-2 px-3 py-2 fs-6">
              <FaKey /> JWT
            </Badge>
            <Badge bg="secondary" className="d-flex align-items-center gap-2 px-3 py-2 fs-6">
              <FaBootstrap /> Bootstrap
            </Badge>
          </div>

          <h5 className="text-white mt-5 mb-3">Links</h5>
          <p className="text-secondary">
            <a
              href="https://github.com/DGSimone99"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none me-3"
            >
              <FaGithub className="me-1" />
              GitHub
            </a>
            |
            <a href="#" className="text-decoration-none mx-3">
              Privacy Policy
            </a>
            |
            <a href="#" className="text-decoration-none ms-3">
              Contacts
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default CreditsPage;
