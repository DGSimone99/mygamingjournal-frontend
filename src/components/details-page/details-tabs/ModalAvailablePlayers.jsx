import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailablePlayers } from "../../../redux/actions/gameEntryActions";
import platformIcons from "../../../utils/platformIcons";
import allLanguages from "../../../utils/allLanguages";
import SetAvailabilityCollapse from "./SetAvailabilityCollapse";
import NoUser from "../../../assets/NoUser.png";
import { useNavigate } from "react-router";
import PaginationControls from "../../common/PaginationControls";

function ModalAvailablePlayers({ game, show, onHide, userEntry }) {
  const dispatch = useDispatch();
  const availablePlayers = useSelector((state) => state.availablePlayers.players || []);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = useSelector((state) => state.availablePlayers.totalPages || 1);
  const navigate = useNavigate();

  useEffect(() => {
    if (show && game?.id) {
      const filters = {};
      if (selectedPlatforms.length > 0) filters.platforms = selectedPlatforms;
      if (selectedLanguages.length > 0) filters.languages = selectedLanguages;

      dispatch(fetchAvailablePlayers(game.id, filters, currentPage));
    }
  }, [dispatch, show, game, selectedPlatforms, selectedLanguages, currentPage]);

  const handlePlatformChange = (platform) => {
    setCurrentPage(0);
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleLanguageChange = (selectedOptions) => {
    setCurrentPage(0);
    setSelectedLanguages(selectedOptions.map((opt) => opt.value));
  };

  const filteredPlayers = availablePlayers.filter((player) => {
    const matchesPlatforms =
      selectedPlatforms.length === 0 || player.availablePlatforms.some((p) => selectedPlatforms.includes(p));
    const matchesLanguages =
      selectedLanguages.length === 0 || player.availableLanguages.some((l) => selectedLanguages.includes(l));
    return matchesPlatforms && matchesLanguages;
  });

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="modal-75">
      <Modal.Header closeButton className="bg-body border-0">
        <Modal.Title>
          <div className="d-flex gap-3 align-items-center">
            <Image src={game?.backgroundImage} height={40} rounded />
            <h3 className="mb-0">{game?.name}</h3>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-section overflow-auto">
        <SetAvailabilityCollapse
          game={game}
          userEntry={userEntry}
          onSuccess={() => {
            const filters = {};
            if (selectedPlatforms.length > 0) filters.platforms = selectedPlatforms;
            if (selectedLanguages.length > 0) filters.languages = selectedLanguages;

            setCurrentPage(0);
            dispatch(fetchAvailablePlayers(game.id, filters, 0));
          }}
        />

        <Row className="mb-4 my-3">
          <Col md={6}>
            <Form.Label>Filter by Platform</Form.Label>
            <div className="d-flex flex-wrap gap-3">
              {game?.platforms
                ?.filter((p) => p !== "Linux")
                .map((platform, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={platform}
                    id={`filter-${platform}`}
                    checked={selectedPlatforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                  />
                ))}
            </div>
          </Col>

          <Col md={6}>
            <Form.Label>Filter by Language</Form.Label>
            <Select
              options={allLanguages}
              isMulti
              onChange={handleLanguageChange}
              classNamePrefix="react-select"
              className="react-select"
              placeholder="Select up to 3 languages"
              maxMenuHeight={150}
              closeMenuOnSelect={false}
              isOptionDisabled={() => selectedLanguages.length >= 3}
            />
          </Col>
        </Row>

        {filteredPlayers.length > 0 && (
          <div className="my-4">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((entry) => (
            <div
              key={entry.userId}
              className="d-flex align-items-center justify-content-between py-3 px-2 pointer-list rounded-2 border border-card my-1 mx-3 px-3"
              onClick={() => navigate(`/user/${entry.userId}`)}
            >
              <div className="d-flex gap-3">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: "55px", height: "55px" }}
                >
                  {entry.level ?? 0}
                </div>
                <div className="d-flex align-items-center gap-3">
                  <Image
                    src={entry.userAvatarUrl || NoUser}
                    className="rounded-circle"
                    height={50}
                    width={50}
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h5 className="mb-0">{entry.userDisplayName}</h5>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 fs-6 flex-wrap align-items-center">
                {entry.availablePlatforms.map((platform, i) => {
                  const icon = platformIcons[platform];
                  return icon ? (
                    <span
                      key={i}
                      className="d-flex align-items-center gap-1 px-2 py-1 border border-secondary rounded-3 bg-dark shadow-sm"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {icon}
                      <span className="fw-semibold">{platform}</span>
                    </span>
                  ) : null;
                })}
              </div>

              <div className="d-flex gap-2 fs-5">
                {entry.availableLanguages.map((code) => {
                  const lang = allLanguages.find((l) => l.value === code);
                  return lang ? (
                    <span key={code} title={lang.label} className="badge bg-dark border-0 rounded-pill px-2">
                      {lang.label.split(" ").at(-1).toUpperCase()}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center my-5">
            <p className="text-secondary">No players currently available.</p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-body border-0">
        <Button className="btn-confirm rounded-pill" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAvailablePlayers;
