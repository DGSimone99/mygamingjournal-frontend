import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { RiQuillPenAiLine } from "react-icons/ri";
import { updateBioFetch } from "../../../redux/actions";

const BioSection = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");

  const handleSave = () => {
    dispatch(updateBioFetch({ bio }))
      .then(() => setIsEditing(false))
      .catch(() => alert("Failed to update bio."));
  };

  const handleCancel = () => {
    setBio(user.bio || "");
    setIsEditing(false);
  };

  return (
    <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
      <h4 className="mb-3">
        Bio{" "}
        <Button
          size="sm"
          onClick={() => setIsEditing(true)}
          className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
        >
          <RiQuillPenAiLine className="me-1" />
          Edit
        </Button>
      </h4>
      {isEditing ? (
        <>
          <Form.Control
            as="textarea"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mb-5 input-field"
          />
          <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2 mt-4">
            <Button className="btn-confirm rounded-pill" onClick={handleSave}>
              Save
            </Button>
            <Button className="bg-secondary border-0 rounded-pill" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <p className="mb-0 text-secondary">{user?.bio || "No bio available."}</p>
      )}
    </div>
  );
};

export default BioSection;
