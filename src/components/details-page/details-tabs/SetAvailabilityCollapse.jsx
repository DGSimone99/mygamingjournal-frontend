import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Alert, Button, Collapse } from "react-bootstrap";
import { updateGameEntryAvailability } from "../../../redux/actions";
import { BiInfoCircle, BiChevronDown } from "react-icons/bi";

function SetAvailabilityCollapse({ game, userEntry, onSuccess }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [availableToPlay, setAvailableToPlay] = useState(Boolean(userEntry?.availableToPlay));
  const [selectedPlatforms, setSelectedPlatforms] = useState(new Set(userEntry?.availablePlatforms || []));
  const [error, setError] = useState("");

  const handleCheckboxChange = (platform) => {
    const updated = new Set(selectedPlatforms);
    if (updated.has(platform)) {
      updated.delete(platform);
    } else {
      if (updated.size >= 3) {
        setError("You can select up to 3 platforms.");
        return;
      }
      updated.add(platform);
    }
    setSelectedPlatforms(updated);
    setError("");
  };

  const handleSave = async () => {
    if (availableToPlay && selectedPlatforms.size === 0) {
      setError("Please select at least one platform.");
      return;
    }

    try {
      await dispatch(
        updateGameEntryAvailability(userEntry.id, {
          availableToPlay,
          availablePlatforms: Array.from(selectedPlatforms),
        })
      );
      setShow(false);
      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      console.error(err);
      setError("Error updating availability.");
    }
  };

  return (
    <div className="mb-3">
      <Button
        className="w-100 text-start d-flex justify-content-between align-items-center bg-dark primary-hover border-0 rounded-bottom-0"
        onClick={() => setShow((prev) => !prev)}
      >
        Set your availability
        <BiChevronDown className={`fs-4 transition ${show ? "rotate-180" : ""}`} />
      </Button>

      <Collapse in={show}>
        <div className="border-0 border-secondary rounded-3 rounded-top-0 p-3 bg-dark">
          <Form>
            <Form.Check
              type="switch"
              id="availableToPlaySwitch"
              label="Available to play"
              checked={availableToPlay}
              onChange={(e) => setAvailableToPlay(e.target.checked)}
              className="mb-2"
            />

            <p className="text-secondary fs-7 d-flex align-items-center mb-3">
              <BiInfoCircle className="me-1" />
              Availability auto-disables after 14 days.
            </p>

            {availableToPlay && (
              <>
                <p className="mb-2 fw-bold">
                  Available until:
                  <span className="fw-normal text-secondary ms-2">
                    {userEntry?.availableUntil || "Auto-set on save"}
                  </span>
                </p>

                <Form.Label>Select up to 3 platforms:</Form.Label>
                <div className="d-flex flex-wrap gap-3 mb-3">
                  {(game?.platforms || []).map((platform, index) => (
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

            {error && <Alert className="bg-danger border-0">{error}</Alert>}

            <div className="d-flex justify-content-start gap-2 mt-3">
              <Button className="btn-confirm rounded-pill" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Collapse>
    </div>
  );
}

export default SetAvailabilityCollapse;
