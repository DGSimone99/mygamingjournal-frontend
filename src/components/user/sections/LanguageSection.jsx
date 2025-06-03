import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { RiQuillPenAiLine } from "react-icons/ri";
import Select from "react-select";
import { useState, useEffect } from "react";
import allLanguages from "../../../utils/allLanguages";
import { updateUserLanguagesFetch } from "../../../redux/actions";

function LanguageSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.settings);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.language) {
      setSelectedLanguages(user.language.map((code) => allLanguages.find((lang) => lang.value === code)));
    }
  }, [user]);

  const handleSave = () => {
    const selectedValues = selectedLanguages.map((lang) => lang.value);
    if (selectedValues.length === 0) {
      setError("Please select at least one language.");
      return;
    }
    setError("");
    dispatch(updateUserLanguagesFetch({ languages: selectedValues }))
      .then(() => setIsEditing(false))
      .catch(() => setError("Update failed. Please try again later."));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setSelectedLanguages(user.language.map((code) => allLanguages.find((lang) => lang.value === code)));
  };

  return (
    <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
      <h4 className="mb-3">
        Languages{" "}
        {!isEditing && (
          <Button
            size="sm"
            className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
            onClick={() => setIsEditing(true)}
          >
            <RiQuillPenAiLine className="me-1" />
            Edit
          </Button>
        )}
      </h4>

      {isEditing ? (
        <>
          <Form.Group>
            <Select
              isMulti
              isSearchable
              options={allLanguages}
              value={selectedLanguages}
              onChange={(selected) => {
                if (selected.length <= 3) setSelectedLanguages(selected);
              }}
              classNamePrefix="react-select"
              className="react-select mb-3"
              placeholder="Select languages..."
            />
            <Form.Text className="text-secondary d-block mb-4">Max 3. Start typing to search.</Form.Text>
            {error && <div className="text-danger mt-1">{error}</div>}
          </Form.Group>
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
        <div className="d-flex flex-wrap gap-2">
          {user?.languages.map((langCode) => (
            <span key={langCode} className="badge bg-primary px-3 py-2 fs-6">
              {allLanguages.find((lang) => lang.value === langCode)?.label || langCode}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSection;
