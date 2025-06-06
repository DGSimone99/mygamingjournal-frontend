import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchFriends } from "../../redux/actions";
import { BiSearch } from "react-icons/bi";
import FriendCard from "./FriendCard";
import UserSearchTab from "./UserSearchTab";
import PaginationControls from "../common/PaginationControls";

function FriendsPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => Boolean(state.auth.token));
  const friends = useSelector((state) => state.friends.friends || []);
  const totalPages = useSelector((state) => state.friends.totalPages || 0);
  const currentPage = useSelector((state) => state.friends.currentPage || 0);

  const [tab, setTab] = useState(isLoggedIn ? "Friends" : "Search");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (isLoggedIn && tab === "Friends") {
      dispatch(fetchFriends(page, 5, searchQuery));
    }
  }, [dispatch, tab, page, searchQuery, isLoggedIn]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setPage(0);
    setSearchQuery(e.target.value);
  };

  return (
    <Container fluid className="page px-3 px-md-5 py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={9}>
          <h1 className="fw-bold text-white text-center mb-4">Friends</h1>

          <div className="tabs-bar d-flex flex-column flex-sm-row">
            {isLoggedIn && (
              <Button
                className={`tabs w-100 rounded-0 rounded-top ${tab === "Friends" ? "active" : ""} ${
                  !isLoggedIn ? "rounded-bottom" : ""
                }`}
                onClick={() => setTab("Friends")}
              >
                Friends
              </Button>
            )}
            <Button
              className={`tabs w-100 rounded-0 ${tab === "Search" ? "active" : ""} ${
                isLoggedIn ? "rounded-bottom" : "rounded-top"
              }`}
              onClick={() => setTab("Search")}
            >
              Search Users
            </Button>
          </div>

          <div className="tabs-content bg-dark p-4 rounded-bottom shadow border border-card border-top-0">
            {isLoggedIn && tab === "Friends" && (
              <>
                <div className="d-flex align-items-center mb-4 border border-secondary rounded overflow-hidden">
                  <BiSearch className="ms-2 fs-3 flex-shrink-0" />
                  <Form.Control
                    type="text"
                    placeholder="Search by username or display name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="input-field-search border-0"
                  />
                </div>

                {totalPages > 1 && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}

                <Row className="g-3">
                  {friends.length > 0 ? (
                    friends.map((friend) => (
                      <Col key={friend.id} xs={12}>
                        <FriendCard friend={friend} />
                      </Col>
                    ))
                  ) : (
                    <p className="text-secondary text-center my-4">No friends found matching your search.</p>
                  )}
                </Row>
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
