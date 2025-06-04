import { useNavigate } from "react-router";
import { Button, Col, Image, Row } from "react-bootstrap";
import NoUser from "../../assets/NoUser.png";
import allLanguages from "../../utils/allLanguages";
import { GrCatalog } from "react-icons/gr";

function FriendCard({ friend }) {
  const navigate = useNavigate();

  const getLanguageLabel = (code) => {
    const match = allLanguages.find((lang) => lang.value === code);
    return match ? match.label.split(" ").at(-1).toUpperCase() : code.toUpperCase();
  };

  return (
    <Row
      className="d-flex align-items-center justify-content-between py-3 px-4 pointer-list rounded-4 border border-card my-2 bg-dark w-100"
      onClick={() => navigate(`/user/${friend.id}`)}
      role="button"
    >
      <Col md={4} className="d-flex align-items-center gap-3 ">
        <div
          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
          style={{ width: "55px", height: "55px" }}
        >
          {friend.level ?? 0}
        </div>

        <Image
          src={friend.avatarUrl || NoUser}
          className="rounded-circle border border-secondary"
          height={55}
          width={55}
          style={{ objectFit: "cover" }}
          alt={`${friend.username}'s avatar`}
        />

        <div>
          <h5 className="mb-1">{friend.displayName}</h5>
          <small className="text-secondary d-block mb-1">@{friend.username}</small>
        </div>
      </Col>

      <Col md={4} className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
        {friend.languages?.map((lang) => (
          <span key={lang} className="badge bg-primary px-2 py-1">
            {getLanguageLabel(lang)}
          </span>
        ))}
      </Col>

      <Col md={4} className="d-flex justify-content-end">
        <Button
          className="border-secondary d-flex align-items-center btn-journal rounded-3 ms-3"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/journal/${friend.id}`);
          }}
        >
          <GrCatalog className="me-2" />
          Journal
        </Button>
      </Col>
    </Row>
  );
}

export default FriendCard;
