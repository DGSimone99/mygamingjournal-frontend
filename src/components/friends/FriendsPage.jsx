import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchFriends } from "../../redux/actions";

import { useAuth } from "../../context/AuthContext";
import { BiSearch } from "react-icons/bi";
import FriendCard from "./FriendCard";
import UserSearchTab from "./UserSearchTab";
import PaginationControls from "../common/PaginationControls";

function FriendsPage() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const totalPages = useSelector((state) => state.friends.totalPages);
  const currentPage = useSelector((state) => state.friends.currentPage);
  const { isLoggedIn } = useAuth();
  const [tab, setTab] = useState("Friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (tab === "Friends") {
      dispatch(fetchFriends(page, 5, searchQuery));
    }
  }, [dispatch, tab, page, searchQuery]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setPage(0);
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTab("Search");
    }
  }, [dispatch, tab, page, searchQuery]);

  return (
    <Container fluid className="page px-5 py-4">
      <Row className="justify-content-center">
        <Col lg={10} xl={9}>
          <h1 className="fw-bold text-white text-center mb-4">Friends</h1>

          <div className="tabs-bar d-flex">
            {isLoggedIn && (
              <Button
                className={`tabs flex-fill text-center rounded rounded-end-0 ${tab === "Friends" ? "active" : ""} `}
                onClick={() => setTab("Friends")}
              >
                Friends
              </Button>
            )}
            <Button
              className={`tabs flex-fill text-center rounded-end rounded-start-0 ${tab === "Search" ? "active" : ""}`}
              onClick={() => setTab("Search")}
            >
              Search Users
            </Button>
          </div>

          <div className="tabs-content bg-dark p-4 rounded-4 rounded-top-0 border-top-0 shadow border border-card">
            {isLoggedIn && tab === "Friends" && (
              <>
                <div className="d-flex align-items-center mb-4 border border-secondary rounded">
                  <BiSearch className="ms-2 fs-3" />
                  <Form.Control
                    type="text"
                    placeholder="Search by username or display name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="input-field-search border-0"
                  />
                </div>

                {totalPages > 0 && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}

                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                  {friends.length > 0 ? (
                    friends.map((friend) => (
                      <Col key={friend.id} xs={12} md={6} className="w-100">
                        <FriendCard friend={friend} />
                      </Col>
                    ))
                  ) : (
                    <p className="text-secondary text-center my-4">No friends found matching your search.</p>
                  )}
                </div>
              </>
            )}

            {tab === "Search" && <UserSearchTab />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FriendsPage;
