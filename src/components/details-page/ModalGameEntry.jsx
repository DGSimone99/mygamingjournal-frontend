import { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteGameEntry, fetchDetails, updateGameEntry, createGameEntry } from "../../redux/actions";

function ModalGameEntry({ gameId, existingGame, show, onHide }) {
  const dispatch = useDispatch();

  const [gameEntryForm, setGameEntryForm] = useState({
    hoursPlayed: 0,
    personalRating: 0,
    status: "PLAYING",
    notes: "",
  });

  useEffect(() => {
    if (existingGame) {
      setGameEntryForm({
        hoursPlayed: existingGame.hoursPlayed ?? 0,
        personalRating: existingGame.personalRating ?? 0,
        status: existingGame.status ?? "PLAYING",
        notes: existingGame.notes ?? "",
      });
    }
  }, [existingGame]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameEntryForm((prev) => ({
      ...prev,
      [name]: name === "personalRating" || name === "hoursPlayed" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (gameEntryForm.personalRating < 0 || gameEntryForm.personalRating > 10) {
      alert("Personal rating must be between 0 and 10.");
      return;
    }

    try {
      if (existingGame) {
        const updatedEntry = { id: existingGame.id, ...gameEntryForm };
        await dispatch(updateGameEntry(updatedEntry));
      } else {
        const newEntry = { idGame: gameId, ...gameEntryForm };
        await dispatch(createGameEntry(newEntry));
      }

      await dispatch(fetchDetails(gameId));
      onHide();
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  const handleDelete = () => {
    if (!existingGame) return;
    dispatch(deleteGameEntry(existingGame.id)).then(() => {
      dispatch(fetchDetails(gameId));
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className="bg-body border-0">
        <Modal.Title>Add Game to Library</Modal.Title>
        <MdClose size={32} onClick={onHide} className="pointer" />
      </Modal.Header>

      <Modal.Body className="bg-section">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Hours Played</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              name="hoursPlayed"
              value={gameEntryForm.hoursPlayed}
              onChange={handleChange}
              className="input-field border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Personal Rating</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="personalRating"
              value={gameEntryForm.personalRating}
              onChange={handleChange}
              className="input-field border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={gameEntryForm.status}
              onChange={handleChange}
              className="input-field border-0"
            >
              <option value="PLAYING">Playing</option>
              <option value="COMPLETED">Completed</option>
              <option value="DROPPED">Dropped</option>
              <option value="BACKLOG">Backlog</option>
              <option value="WISHLIST">Wishlist</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={gameEntryForm.notes}
              onChange={handleChange}
              className="input-field border-0"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="bg-body border-0">
        {existingGame && (
          <Button className="btn-delete border-0 rounded-pill me-auto" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button className="btn-confirm rounded-pill" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalGameEntry;
