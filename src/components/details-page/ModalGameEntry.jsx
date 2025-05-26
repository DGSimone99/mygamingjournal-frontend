import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteGameEntry, fetchDetails, fetchUserGameEntries, saveGameEntry } from "../../redux/actions";
import { MdClose } from "react-icons/md";

function ModalGameEntry(props) {
  const gameId = props.gameId;
  const existingGame = props.existingGame;
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    hoursPlayed: 0,
    personalRating: 0,
    status: "",
    completionMode: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (existingGame) {
      setForm({
        hoursPlayed: existingGame.hoursPlayed || 0,
        personalRating: existingGame.personalRating || 0,
        status: existingGame.status || "",
        completionMode: existingGame.completionMode || "",
        notes: existingGame.notes || "",
      });
    }
  }, [existingGame]);

  const handleSubmit = () => {
    props.onHide();
    if (form.personalRating < 0 || form.personalRating > 10) {
      alert("Personal rating must be between 0 and 10.");
      return;
    }
    const gameData = {
      idGame: gameId,
      ...form,
    };

    const method = existingGame ? "put" : "post";
    dispatch(saveGameEntry(gameData, method)).then(() => {
      dispatch(fetchDetails(gameId));
      dispatch(fetchUserGameEntries());
    });
  };

  const handleDelete = (id) => {
    props.onHide();
    dispatch(deleteGameEntry(id)).then(() => {
      dispatch(fetchDetails(gameId));
    });
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton className="modal-custom border-0">
        <Modal.Title>Add Game to Library</Modal.Title>
        <MdClose size={32} onClick={props.onHide} className="pointer" />
      </Modal.Header>

      <Modal.Body className="bg-main-details">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Hours Played</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              name="hoursPlayed"
              value={form.hoursPlayed}
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
              value={form.personalRating}
              onChange={handleChange}
              className="input-field border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange} className="input-field border-0">
              <option value="PLAYING">Playing</option>
              <option value="COMPLETED">Completed</option>
              <option value="DROPPED">Dropped</option>
              <option value="BACKLOG">Backlog</option>
              <option value="WISHLIST">Wishlist</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Completition</Form.Label>
            <Form.Select
              name="completionMode"
              value={form.completionMode}
              onChange={handleChange}
              className="input-field border-0"
            >
              <option value="UNCOMPLETED">Uncompleted</option>
              <option value="MAIN_STORY">Main Story Completed</option>
              <option value="MAIN_STORY_PLUS">Main Story Plus Completed</option>
              <option value="COMPLETIONIST">Full Completion (100%)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="input-field border-0"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="modal-custom border-0">
        {existingGame && (
          <Button
            className="modal-btn-delete border-0 rounded-pill me-auto"
            onClick={() => handleDelete(existingGame.id)}
          >
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
