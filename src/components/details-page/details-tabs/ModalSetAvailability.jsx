import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { updateGameEntryAvailability } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";

function ModalSetAvailability({ show, onHide, game, userEntry }) {
  const [availableToPlay, setAvailableToPlay] = useState(userEntry?.availableToPlay || false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(new Set(userEntry?.availablePlatforms || []));
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleCheckboxChange = (platform) => {
    const newSet = new Set(selectedPlatforms);
    if (newSet.has(platform)) {
      newSet.delete(platform);
    } else {
      if (newSet.size >= 2) {
        setError("You can select up to 3 platforms.");
        return;
      }
      newSet.add(platform);
    }
    setError("");
    setSelectedPlatforms(newSet);
  };

  const handleSave = async () => {
    try {
      await dispatch(
        updateGameEntryAvailability(userEntry.id, {
          availableToPlay: availableToPlay,
          availablePlatforms: Array.from(selectedPlatforms),
        })
      );

      onHide();
    } catch (err) {
      console.error(err);
      setError("Error updating availability.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-body border-0">
        <Modal.Title>Set Availability</Modal.Title>
        <MdClose size={32} onClick={onHide} className="pointer" />
      </Modal.Header>

      <Modal.Body className="bg-section">
        <Form>
          <Form.Check
            type="switch"
            id="availableToPlaySwitch"
            label="Available to play"
            checked={availableToPlay}
            onChange={(e) => setAvailableToPlay(e.target.checked)}
            className="mb-3"
          />

          {availableToPlay && (
            <>
              <hr />
              <Form.Label>Select up to 3 platforms:</Form.Label>
              <div className="mb-3">
                {game?.platforms?.map((platform, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={`platform-${platform}`}
                    label={platform}
                    checked={selectedPlatforms.has(platform)}
                    onChange={() => handleCheckboxChange(platform)}
                    className="text-white"
                  />
                ))}
              </div>
            </>
          )}

          {error && <Alert className="mt-3 bg-danger border-0">{error}</Alert>}
        </Form>
      </Modal.Body>

      <Modal.Footer className="bg-body border-0">
        <Button className="btn-delete border-0 rounded-pill" onClick={onHide}>
          Cancel
        </Button>
        <Button className="btn-confirm rounded-pill" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSetAvailability;
