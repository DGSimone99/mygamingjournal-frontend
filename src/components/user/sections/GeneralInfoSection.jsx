import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { RiQuillPenAiLine } from "react-icons/ri";
import { updateUserNamesFetch } from "../../../redux/actions/userActions";

const GeneralInfoSection = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({
    username: user?.username,
    displayName: user?.displayName,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    setErrorMessage("");
    dispatch(updateUserNamesFetch(edited))
      .then(() => setIsEditing(false))
      .catch(() => {
        setErrorMessage("Update failed. Please try again.");
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEdited({
      username: user.username,
      displayName: user.displayName,
    });
    setErrorMessage("");
  };

  return (
    <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
      <h4 className="mb-3">
        General Info{" "}
        <Button
          size="sm"
          onClick={() => setIsEditing(true)}
          className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
        >
          <RiQuillPenAiLine className="me-1" />
          Edit
        </Button>
      </h4>

      {errorMessage && <p className="text-danger fw-semibold mb-2">{errorMessage}</p>}

      <h5 className="mb-2 d-flex align-items-center gap-2">
        Username: <span className="text-secondary">{user?.username}</span>
      </h5>

      <h5 className="mb-2 d-flex align-items-center gap-2">
        Display Name:{" "}
        {isEditing ? (
          <Form.Control
            value={edited.displayName}
            onChange={(e) => setEdited({ ...edited, displayName: e.target.value })}
            className="input-field-filter border-secondary mt-1"
          />
        ) : (
          <span className="text-secondary">{user?.displayName}</span>
        )}
      </h5>

      <h5 className="mb-0">
        Email: <span className="text-secondary">{user?.email}</span>
      </h5>

      {isEditing && (
        <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2 mt-4">
          <Button className="btn-confirm rounded-pill" onClick={handleSave}>
            Save
          </Button>
          <Button className="bg-secondary border-0 rounded-pill" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default GeneralInfoSection;
