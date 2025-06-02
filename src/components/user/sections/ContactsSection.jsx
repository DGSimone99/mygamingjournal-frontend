import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { RiQuillPenAiLine } from "react-icons/ri";
import { updateUserContactsFetch } from "../../../redux/actions";

const ContactsSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [isEditing, setIsEditing] = useState(false);
  const [contacts, setContacts] = useState({
    steamUsername: user?.steamUsername || "",
    psnUsername: user?.psnUsername || "",
    xboxUsername: user?.xboxUsername || "",
    nintendoUsername: user?.nintendoUsername || "",
    epicUsername: user?.epicUsername || "",
    riotId: user?.riotId || "",
    discordTag: user?.discordTag || "",
  });

  const handleChange = (field, value) => {
    setContacts({ ...contacts, [field]: value });
  };

  const handleSave = () => {
    dispatch(updateUserContactsFetch(contacts)).then(() => setIsEditing(false));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setContacts({
      steamUsername: user?.steamUsername || "",
      psnUsername: user?.psnUsername || "",
      xboxUsername: user?.xboxUsername || "",
      nintendoUsername: user?.nintendoUsername || "",
      epicUsername: user?.epicUsername || "",
      riotId: user?.riotId || "",
      discordTag: user?.discordTag || "",
    });
  };

  const renderContact = (label, key) => (
    <Col md={6} className="mb-2" key={key}>
      <strong>{label}:</strong>{" "}
      {isEditing ? (
        <Form.Control
          size="sm"
          value={contacts[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder={label + " username"}
          className="input-field-filter border-secondary mt-1"
        />
      ) : (
        <span className="ms-2 text-tertiary">
          {contacts[key] ? contacts[key] : <span className="text-secondary">Not set</span>}
        </span>
      )}
    </Col>
  );

  return (
    <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
      <h4 className="mb-3">
        Contacts{" "}
        <Button
          size="sm"
          className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
          onClick={() => setIsEditing(true)}
        >
          <RiQuillPenAiLine className="me-1" />
          Edit
        </Button>
      </h4>

      <Row className="text-secondary">
        {renderContact("Steam", "steamUsername")}
        {renderContact("Epic Games", "epicUsername")}
        {renderContact("PlayStation", "psnUsername")}
        {renderContact("Riot ID", "riotId")}
        {renderContact("Xbox", "xboxUsername")}
        {renderContact("Discord", "discordTag")}
        {renderContact("Nintendo", "nintendoUsername")}
      </Row>

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

export default ContactsSection;
