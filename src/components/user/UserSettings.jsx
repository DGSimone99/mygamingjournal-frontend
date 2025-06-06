import { Button, Container, Image, Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NoUser from "../../assets/NoUser.png";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import LanguageSection from "./sections/LanguageSection";
import BioSection from "./sections/BioSection";
import ContactsSection from "./sections/ContactsSection";
import { fetchDeleteCurrentUser, fetchUserSettings, updateUserAvatarFetch } from "../../redux/actions";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { RiQuillPenAiLine } from "react-icons/ri";

const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.settings);
  const isLoggedIn = useSelector((state) => Boolean(state.auth.token));

  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(fetchUserSettings());
    }
  }, [isLoggedIn, navigate, dispatch]);

  const handleDelete = async () => {
    await dispatch(fetchDeleteCurrentUser());
    setShowModal(false);
    navigate("/");
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    try {
      await dispatch(updateUserAvatarFetch(file));
    } catch {
      alert("Failed to upload avatar.");
    } finally {
      setUploading(false);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  if (!user) {
    return <div className="text-center pt-5">Loading account settings...</div>;
  }

  return (
    <Container fluid className="pt-4 overflow-auto">
      <h1 className="mb-5 display-5 fw-bold">Account Settings</h1>

      <Row className="gap-4 mb-5">
        <Col xs={12} md={2} className="d-flex justify-content-center mb-5">
          <div style={{ width: 180, height: 180 }}>
            <Image
              src={user.avatarUrl || NoUser}
              alt="User avatar"
              height={180}
              width={180}
              fluid
              roundedCircle
              className="border border-secondary shadow-sm"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div
              className="primary-hover bottom-0 end-0 mb-2 me-2 px-2 py-1 rounded-pill pointer my-2 border-secondary bg-sidebar d-flex align-items-center justify-content-center"
              onClick={openFileDialog}
              disabled={uploading}
              aria-label="Change avatar"
            >
              <Button style={{ width: 36, height: 36 }} className="border-0 bg-transparent p-0">
                {uploading ? <Spinner animation="border" size="sm" /> : <RiQuillPenAiLine size={18} />}
              </Button>
              <div>Change avatar</div>
            </div>
          </div>
        </Col>

        <Col xs={12} md={9}>
          <GeneralInfoSection />
          <LanguageSection />
          <BioSection />
          <ContactsSection />

          <div className="d-flex flex-column flex-sm-row gap-3 mt-4 justify-content-between">
            <Button className="bg-primary primary-hover border-0 rounded-5" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
            <Button className="bg-danger danger-hover border-0 rounded-5" onClick={() => setShowModal(true)}>
              Delete Account
            </Button>
          </div>
        </Col>
      </Row>

      <DeleteConfirmationModal show={showModal} onHide={() => setShowModal(false)} onConfirm={handleDelete} />
      <ChangePasswordModal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} />
    </Container>
  );
};

export default UserSettings;
