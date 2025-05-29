import { Button, Container, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import NoUser from "../../assets/NoUser.png";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import allLanguages from "../../utils/allLanguages";
import { RiQuillPenAiLine } from "react-icons/ri";

const UserSettings = () => {
  const user = useSelector((state) => state.user);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  function getLanguageLabel(code) {
    const match = allLanguages.find((lang) => lang.value === code);
    return match ? match.label : code;
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <Container className="page text-white py-5">
      <h1 className="mb-5 display-5 fw-bold">Account Settings</h1>

      <div className="d-flex flex-column flex-md-row align-items-start gap-5 mb-5">
        <div className="text-center">
          <Image
            src={user.avatarUrl || NoUser}
            alt="User avatar"
            height={180}
            roundedCircle
            className="border border-secondary shadow-sm"
          />
        </div>

        <div className="flex-grow-1 w-100">
          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
            <h4 className="mb-3">
              General Info{" "}
              <Button
                size="sm"
                className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
              >
                <RiQuillPenAiLine className="me-1" />
                Edit
              </Button>
            </h4>
            <h5 className="mb-2">
              Username: <span className="text-secondary">{user.username}</span>
            </h5>
            <h5 className="mb-2">
              Display Name: <span className="text-secondary">{user.displayName}</span>
            </h5>
            <h5 className="mb-0">
              Email: <span className="text-secondary">{user.email}</span>
            </h5>
          </div>

          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
            <h4 className="mb-3">
              Languages{" "}
              <Button
                size="sm"
                className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
              >
                <RiQuillPenAiLine className="me-1" />
                Edit
              </Button>
            </h4>
            <div className="d-flex flex-wrap gap-2">
              {user.language.map((langCode) => (
                <span key={langCode} className="badge bg-primary px-3 py-2 fs-6">
                  {getLanguageLabel(langCode)}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
            <h4 className="mb-3">
              Bio{" "}
              <Button
                size="sm"
                className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
              >
                <RiQuillPenAiLine className="me-1" />
                Edit
              </Button>
            </h4>
            <p className="mb-0 text-secondary">{user.bio || "No bio available."}</p>
          </div>

          <div className="d-flex gap-3 mt-4 justify-content-between">
            <Button className="bg-primary border-0 rounded-5">Change Password</Button>
            <Button className="bg-danger border-0 rounded-5">Delete Account</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserSettings;
