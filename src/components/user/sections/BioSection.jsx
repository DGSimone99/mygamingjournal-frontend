import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { RiQuillPenAiLine } from "react-icons/ri";
import { updateBioFetch } from "../../../redux/actions";

function BioSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.settings);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.bio) setBio(user.bio);
  }, [user?.bio]);

  const handleSave = () => {
    if (!bio.trim()) return;
    dispatch(updateBioFetch({ bio }))
      .then(() => setIsEditing(false))
      .catch(() => alert("Failed to update bio."));
  };

  const handleCancel = () => {
    setBio(user?.bio || "");
    setIsEditing(false);
  };

  const isUnchanged = bio === (user?.bio || "");

  return (
    <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
      <h4 className="mb-3">
        Bio{" "}
        {!isEditing && (
          <Button
            size="sm"
            onClick={() => setIsEditing(true)}
            className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
          >
            <RiQuillPenAiLine className="me-1" />
            Edit
          </Button>
        )}
      </h4>

      {isEditing ? (
        <>
          <Form.Control
            as="textarea"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mb-5 input-field"
            maxLength={500}
            placeholder="Write something about yourself..."
          />
          <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
            <Button className="btn-confirm rounded-pill" onClick={handleSave} disabled={!bio.trim() || isUnchanged}>
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
}

export default BioSection;
