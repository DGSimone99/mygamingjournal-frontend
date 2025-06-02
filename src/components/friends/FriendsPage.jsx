import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { fetchFriends } from "../../redux/actions";
import FriendCard from "./FriendCard";
import PaginationControls from "../common/PaginationControls";

function FriendsPage() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);
  const totalPages = useSelector((state) => state.friends.totalPages);
  const currentPage = useSelector((state) => state.friends.currentPage);

  const [tab, setTab] = useState("Friends");

  useEffect(() => {
    if (tab === "Friends") {
      dispatch(fetchFriends(0, 5));
    }
  }, [dispatch, tab]);

  const handlePageChange = (page) => {
    dispatch(fetchFriends(page, 5));
  };

  return (
    <Container fluid className="page px-5 py-4">
      <Row className="justify-content-center">
        <Col lg={10} xl={9}>
          <h1 className="fw-bold text-white text-center mb-4">Friends</h1>

          <div className="tabs-bar d-flex">
            <Button
              className={`tabs flex-fill text-center rounded rounded-end-0 ${tab === "Friends" ? "active" : ""}`}
              onClick={() => setTab("Friends")}
            >
              Friends
            </Button>
            <Button
              className={`tabs flex-fill text-center rounded-end rounded-start-0 ${tab === "Search" ? "active" : ""}`}
              onClick={() => setTab("Search")}
            >
              Search Users
            </Button>
          </div>

          <div className="tabs-content bg-dark p-4 rounded-4 rounded-top-0 border-top-0 shadow border border-card">
            {totalPages > 0 && (
              <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            {tab === "Friends" && (
              <>
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                  {friends.length > 0 ? (
                    friends.map((friend) => (
                      <Col key={friend.id} xs={12} md={6} className="w-100">
                        <FriendCard friend={friend} />
                      </Col>
                    ))
                  ) : (
                    <p className="text-secondary text-center my-4">
                      You haven’t followed anyone yet. Start building your gaming crew!
                    </p>
                  )}
                </div>
              </>
            )}

            {tab === "Search" && <div className="text-center text-secondary"></div>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FriendsPage;
