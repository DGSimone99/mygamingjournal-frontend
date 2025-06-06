import { useLocation, Link } from "react-router";
import { useDispatch } from "react-redux";
import { Row, Col, Image, Badge, Button } from "react-bootstrap";
import { StarFill, Trash3Fill } from "react-bootstrap-icons";
import { SlBadge } from "react-icons/sl";
import { deleteGameEntry } from "../../redux/actions";

function GameEntryCard({ gameEntry }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const isMyJournal = location.pathname === "/myJournal";

  const statusColors = {
    COMPLETED: "success",
    PLAYING: "tertiary",
    WISHLIST: "warning",
    DROPPED: "danger",
    BACKLOG: "secondary",
  };

  const statusName = {
    COMPLETED: "Completed",
    PLAYING: "Playing",
    WISHLIST: "Wishlist",
    DROPPED: "Dropped",
    BACKLOG: "Backlog",
  };

  const colorClass = statusColors[gameEntry.status];
  const status = statusName[gameEntry.status] || "Unknown";
  const unlockedCount = gameEntry.achievements?.filter((a) => a.unlocked).length || 0;

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteGameEntry(gameEntry.id));
  };

  return (
    <Row
      as={Link}
      to={`/game/${gameEntry.gameId}`}
      className={`align-items-center py-2 px-2 my-2 rounded-2 text-decoration-none shadow-sm border-start border-4 pointer-list bg-dark border-${colorClass}`}
    >
      <Col xs={2}>
        <Image
          src={gameEntry?.backgroundImage}
          rounded
          style={{ width: "100%", height: "100px", objectFit: "cover" }}
        />
      </Col>
      <Col xs={3}>
        <h5 className="mb-1">{gameEntry.gameName}</h5>
        <div className="text-secondary">Hours played: {gameEntry.hoursPlayed}h</div>
      </Col>
      <Col>
        <p className={`mb-0 text-center text-${colorClass}`}>{status}</p>
      </Col>
      <Col xs={2} className="d-flex align-items-center">
        <StarFill className="me-1" style={{ fill: "var(--added)" }} />
        {gameEntry.personalRating}/10
      </Col>
      <Col xs={2} className="text-end d-flex align-items-center">
        <Badge className="bg-primary d-none d-md-block">
          <SlBadge className="me-2" />
          {unlockedCount}/{gameEntry.achievements?.length || 0}
        </Badge>
        {isMyJournal && (
          <Button onClick={handleDelete} className="bg-transparent border-0 rounded-5 ms-auto">
            <Trash3Fill className="fs-6 mb-1" style={{ fill: "var(--danger)" }} />
          </Button>
        )}
      </Col>
    </Row>
  );
}

export default GameEntryCard;
