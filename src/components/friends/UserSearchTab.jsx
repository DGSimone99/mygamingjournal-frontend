import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { fetchAllUsers } from "../../redux/actions";
import FriendCard from "./FriendCard";
import PaginationControls from "../common/PaginationControls";

function UserSearchTab() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const totalPages = useSelector((state) => state.users.totalPages);
  const currentPage = useSelector((state) => state.users.currentPage);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (query.trim() !== "") {
      dispatch(fetchAllUsers(page, 5, query));
    }
  }, [dispatch, page, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4 border border-secondary rounded">
        <BiSearch className="ms-2 fs-3" />
        <Form.Control
          type="text"
          placeholder="Search users by username or display name..."
          value={query}
          onChange={handleSearchChange}
          className="input-field-search border-0"
        />
      </div>

      {query.trim() === "" ? (
        <p className="text-secondary text-center my-5 fs-5">Start typing to search users</p>
      ) : (
        <>
          {totalPages > 0 && (
            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}

          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {users?.length > 0 ? (
              users.map((user) => (
                <Col key={user.id} xs={12} md={6} className="w-100">
                  <FriendCard friend={user} />
                </Col>
              ))
            ) : (
              <p className="text-secondary text-center my-4">No users match your search.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserSearchTab;
