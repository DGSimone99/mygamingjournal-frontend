import { Button, Image, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NoUser from "../../assets/NoUser.png";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import LanguageSection from "./sections/LanguageSection";
import BioSection from "./sections/BioSection";
import ContactsSection from "./sections/ContactsSection";
import { fetchDeleteCurrentUser } from "../../redux/actions";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { useAuth } from "../../context/AuthContext";

const UserSettings = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleDelete = async () => {
    await dispatch(fetchDeleteCurrentUser());
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="pt-4 overflow-auto px-5 mx-5">
      <h1 className="mb-5 display-5 fw-bold">Account Settings</h1>

      <div className="d-flex gap-5 mb-5">
        <div className="text-center">
          <Image
            src={user?.avatarUrl || NoUser}
            alt="User avatar"
            height={180}
            roundedCircle
            className="border border-secondary shadow-sm"
          />
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
        <DeleteConfirmationModal show={showModal} onHide={() => setShowModal(false)} onConfirm={handleDelete} />
        <ChangePasswordModal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} />
      </div>
    </div>
  );
};

export default UserSettings;
