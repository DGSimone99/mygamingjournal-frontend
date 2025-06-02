import { useNavigate } from "react-router";
import { Button, Image } from "react-bootstrap";
import NoUser from "../../assets/NoUser.png";
import allLanguages from "../../utils/allLanguages";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { GrCatalog } from "react-icons/gr";

function FriendCard({ friend }) {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const getLanguageLabel = (code) => {
    const match = allLanguages.find((lang) => lang.value === code);
    return match ? match.label : code;
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between py-3 pointer-list rounded-4 border border-card my-2 px-4 bg-dark w-100"
      onClick={() => navigate(`/user/${friend.id}`)}
    >
      <div className="d-flex">
        <div
          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: "55px", height: "55px" }}
        >
          {friend.level ?? 0}
        </div>

        <div className="d-flex align-items-center gap-3 flex-grow-1 px-3">
          <Image
            src={friend.avatarUrl || NoUser}
            className="rounded-circle border border-secondary"
            height={55}
            width={55}
            style={{ objectFit: "cover" }}
            alt="User Avatar"
          />
          <div>
            <h5 className="mb-1">{friend.displayName}</h5>
            <small className="text-secondary d-block mb-1">@{friend.username}</small>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2">
        {friend.language?.map((lang) => (
          <span key={lang} className="badge bg-primary px-2 py-1">
            {getLanguageLabel(lang)}
          </span>
        ))}
      </div>

      <Button
        className="border-secondary d-flex align-items-center btn-journal rounded-3"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/journal/${friend.id}`);
        }}
      >
        <GrCatalog className="me-2" />
        Journal
      </Button>
    </div>
  );
}

export default FriendCard;
