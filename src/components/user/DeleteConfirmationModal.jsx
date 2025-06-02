import { Modal, Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";

const DeleteConfirmationModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-body border-0">
        <Modal.Title>Delete Account</Modal.Title>
        <MdClose size={32} onClick={onHide} className="pointer" />
      </Modal.Header>

      <Modal.Body className="bg-section">
        <p className="mb-0">
          Are you sure you want to delete your account? This action is <strong>irreversible</strong>.
        </p>
      </Modal.Body>

      <Modal.Footer className="bg-body border-0">
        <Button className="btn-delete border-0 rounded-pill me-auto" onClick={onHide}>
          Cancel
        </Button>
        <Button className="btn-confirm rounded-pill" onClick={onConfirm}>
          Yes, delete my account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
