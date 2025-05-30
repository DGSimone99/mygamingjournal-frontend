import { useState, useEffect } from "react";
import GameEntryCard from "./GameEntryCard.jsx";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { fetchOtherUserGameEntries } from "../../redux/actions/gameEntryActions.js";

function JournalPage() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  const { userId } = useParams();

  const gameEntries = useSelector((state) => state.gameEntries);
  const userGameEntries = useSelector((state) => state.userGameEntries);

  const [currentEntries, setCurrentEntries] = useState(gameEntries);

  const statusPriority = {
    PLAYING: 1,
    COMPLETED: 2,
    BACKLOG: 3,
    DROPPED: 4,
    WISHLIST: 5,
  };

  const [myJournal, setMyJournal] = useState(false);

  useEffect(() => {
    if (location.pathname === "/myJournal") {
      setMyJournal(true);
      setCurrentEntries(gameEntries);
    } else if (userId) {
      setMyJournal(false);
      dispatch(fetchOtherUserGameEntries(userId));
    }
  }, [location, userId]);

  useEffect(() => {
    if (!myJournal && userGameEntries.length > 0) {
      setCurrentEntries(userGameEntries);
    }
  }, [userGameEntries, myJournal]);

  const filteredEntries = currentEntries
    .filter((entry) => statusFilter === "ALL" || entry.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "NAME") return a.gameName.localeCompare(b.gameName);
      if (sortBy === "HOURS") return b.hoursPlayed - a.hoursPlayed;
      if (sortBy === "RATING") return b.personalRating - a.personalRating;

      const priorityA = statusPriority[a.status] || 99;
      const priorityB = statusPriority[b.status] || 99;
      return priorityA - priorityB;
    });

  return (
    <Container>
      <div className="mt-3">
        <div className="d-flex justify-content-between mb-3">
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

          <Form.Select
            className="input-field-filter-2 border-secondary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default Order</option>
            <option value="NAME">Order by Name</option>
            <option value="HOURS">Order by Hours Plated</option>
            <option value="RATING">Order by Score</option>
          </Form.Select>
        </div>

        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => <GameEntryCard key={entry.gameEntryId} gameEntry={entry} />)
        ) : (
          <div className="text-center mt-5">
            <h2 className="mb-4">No Games Found</h2>
            {myJournal && (
              <Button as={Link} to="/catalog" variant="outline-secondary" className="primary-hover" size="lg">
                Explore the catalog
              </Button>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

export default JournalPage;
