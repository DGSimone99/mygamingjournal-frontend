import { Button, Image, Spinner } from "react-bootstrap";
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
    <div className="pt-4 overflow-auto px-5 mx-5">
      <h1 className="mb-5 display-5 fw-bold">Account Settings</h1>

      <div className="d-flex gap-5 mb-5">
        <div className="text-center position-relative" style={{ width: 180, height: 180 }}>
          <Image
            src={user.avatarUrl || NoUser}
            alt="User avatar"
            height={180}
            width={180}
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
          <Button
            onClick={openFileDialog}
            disabled={uploading}
            className="position-absolute primary-hover bottom-0 end-0 mb-2 me-2 p-0 rounded-circle border-secondary bg-sidebar d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36 }}
            aria-label="Change avatar"
          >
            {uploading ? <Spinner animation="border" size="sm" /> : <RiQuillPenAiLine size={18} />}
          </Button>
        </div>

        <div className="w-100">
          <GeneralInfoSection />
          <LanguageSection />
          <BioSection />
          <ContactsSection />

          <div className="d-flex gap-3 mt-4 justify-content-between">
            <Button className="bg-primary primary-hover border-0 rounded-5" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
            <Button className="bg-danger danger-hover border-0 rounded-5" onClick={() => setShowModal(true)}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal show={showModal} onHide={() => setShowModal(false)} onConfirm={handleDelete} />
      <ChangePasswordModal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} />
    </div>
  );
};

export default UserSettings;
