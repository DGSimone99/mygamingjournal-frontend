import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { changePasswordFetch } from "../../redux/actions";

const ChangePasswordModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      await dispatch(changePasswordFetch(form));
      onHide();
    } catch (err) {
      const msg = err?.response?.data?.message || "Password change failed.";
      setError(msg);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-body border-0">
        <Modal.Title>Change Password</Modal.Title>
        <MdClose size={32} onClick={onHide} className="pointer" />
      </Modal.Header>

      <Modal.Body className="bg-section">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              className="input-field border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="input-field border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmNewPassword"
              value={form.confirmNewPassword}
              onChange={handleChange}
              className="input-field border-0"
            />
          </Form.Group>

          {error && <p className="text-danger mt-2">{error}</p>}
        </Form>
      </Modal.Body>

      <Modal.Footer className="bg-body border-0">
        <Button className="btn-delete border-0 rounded-pill me-auto" onClick={onHide}>
          Cancel
        </Button>
        <Button className="btn-confirm rounded-pill" onClick={handleSubmit}>
          Change Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
