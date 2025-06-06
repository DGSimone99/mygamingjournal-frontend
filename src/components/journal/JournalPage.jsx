import { useEffect, useState } from "react";
import GameEntryCard from "./GameEntryCard.jsx";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router";
import { fetchOtherUserGameEntries, fetchUserGameEntries } from "../../redux/actions/gameEntryActions.js";

function JournalPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => Boolean(state.auth.token));
  const isMyJournal = location.pathname === "/myJournal";

  const myGameEntries = useSelector((state) => state.gameEntries);
  const userGameEntries = useSelector((state) => state.userGameEntries.games);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const currentEntries = isMyJournal ? myGameEntries : userGameEntries;

  const statusPriority = {
    PLAYING: 1,
    COMPLETED: 2,
    BACKLOG: 3,
    DROPPED: 4,
    WISHLIST: 5,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      if (isMyJournal) {
        await dispatch(fetchUserGameEntries());
      } else if (userId) {
        await dispatch(fetchOtherUserGameEntries(userId));
      }
      setIsLoading(false);
    };

    loadData();
  }, [dispatch, isLoggedIn, isMyJournal, userId, navigate]);

  const filteredEntries = currentEntries
    .filter((entry) => statusFilter === "ALL" || entry.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "NAME") return a.gameName.localeCompare(b.gameName);
      if (sortBy === "HOURS") return b.hoursPlayed - a.hoursPlayed;
      if (sortBy === "RATING") return b.personalRating - a.personalRating;

      const priorityA = statusPriority[a.status] || 99;
      const priorityB = statusPriority[b.status] || 99;

      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.gameName.localeCompare(b.gameName);
    });

  return (
    <Container fluid="md" className="mt-3">
      <Row className="g-3 mb-3">
        <Col xs={12} md={6}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field-filter border-secondary"
          >
            <option value="ALL">All Games</option>
            <option value="PLAYING">Playing</option>
            <option value="COMPLETED">Completed</option>
            <option value="BACKLOG">Backlog</option>
            <option value="DROPPED">Dropped</option>
            <option value="WISHLIST">Wishlisted</option>
          </Form.Select>
        </Col>

        <Col xs={12} md={6} className="d-flex justify-content-end">
          <Form.Select
            className="input-field-filter border-secondary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default Order</option>
            <option value="NAME">Order by Name</option>
            <option value="HOURS">Order by Hours Played</option>
            <option value="RATING">Order by Score</option>
          </Form.Select>
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center mt-5">
          <h2>Loading...</h2>
        </div>
      ) : filteredEntries.length > 0 ? (
        filteredEntries.map((entry) => <GameEntryCard key={entry.id} gameEntry={entry} />)
      ) : (
        <div className="text-center mt-5">
          <h2 className="mb-4">No Games Found</h2>
          {isMyJournal && (
            <Button as={Link} to="/catalog" variant="outline-secondary" className="primary-hover" size="lg">
              Explore the catalog
            </Button>
          )}
        </div>
      )}
    </Container>
  );
}

export default JournalPage;
