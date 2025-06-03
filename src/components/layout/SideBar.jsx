import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Image, Nav } from "react-bootstrap";
import { GrCatalog } from "react-icons/gr";
import { FaList, FaUser, FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Logo from "../../assets/logo.png";
import NoUser from "../../assets/NoUser.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutFetch } from "../../redux/actions/authActions";

function SideBar() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const userMinimal = useSelector((state) => state.user.minimal);

  const [showCatalogDropdown, setShowCatalogDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutFetch());
  };

  return (
    <div className="sidebar z-3 h-100 pt-3 d-flex flex-column justify-content-between text-center position-fixed top-0">
      <Button className="border-0 bg-transparent p-0" as={Link} to="/">
        <Image src={Logo} className="sidebar-logo d-block mx-auto" alt="logo" height={60} width={60} />
      </Button>

      <Nav className="sidebar-nav d-flex flex-column gap-4">
        <Dropdown
          className="py-2 fs-7"
          onMouseEnter={() => setShowCatalogDropdown(true)}
          onMouseLeave={() => setShowCatalogDropdown(false)}
        >
          <Nav.Link as={Link} to="/catalog/" className="sidebar-item d-flex align-items-center flex-column gap-2">
            <FaList className="sidebar-icon fs-2" />
            Catalog
          </Nav.Link>
          {showCatalogDropdown && (
            <div className="dropdown-menu-custom position-absolute top-0 z-3 p-2 overflow-y-auto">
              <Dropdown.Item className="py-2 px-3" as={Link} to="/catalog/">
                Top Rated
              </Dropdown.Item>
              <Dropdown.Item className="py-2 px-3" as={Link} to="/catalog/">
                New Releases
              </Dropdown.Item>
              <Dropdown.Item className="py-2 px-3" as={Link} to="/catalog/">
                Upcoming Games
              </Dropdown.Item>
            </div>
          )}
        </Dropdown>

        <Nav.Link as={Link} to="/myJournal" className="sidebar-item d-flex align-items-center flex-column gap-2">
          <GrCatalog className="sidebar-icon fs-2" />
          Journal
        </Nav.Link>

        <Nav.Link as={Link} to="/friends" className="sidebar-item d-flex align-items-center flex-column gap-2">
          <FaUserFriends className="sidebar-icon fs-2" />
          Friends
        </Nav.Link>

        <Nav.Link as={Link} to="/" className="sidebar-item d-flex align-items-center flex-column gap-2">
          <IoIosNotifications className="sidebar-icon fs-2" />
          Notifs
        </Nav.Link>
      </Nav>

      {!token ? (
        <Nav.Link as={Link} to="/login" className="sidebar-item d-flex align-items-center flex-column gap-2 py-2">
          <FaUser className="sidebar-icon fs-2" />
          Login
        </Nav.Link>
      ) : (
        <Dropdown
          className="py-2 fs-7"
          onMouseEnter={() => setShowAccountDropdown(true)}
          onMouseLeave={() => setShowAccountDropdown(false)}
        >
          <Nav.Link as={Link} to="/user/me" className="sidebar-item d-flex align-items-center flex-column gap-2 py-2">
            <Image
              src={userMinimal?.avatarUrl || NoUser}
              className="sidebar-image rounded-circle"
              alt="user"
              height={40}
              width={40}
            />
            Account
          </Nav.Link>

          {showAccountDropdown && (
            <div className="dropdown-menu-custom position-absolute top-0 z-3 p-2 overflow-y-auto">
              <Dropdown.Item className="py-2 px-3" as={Link} to="/user/settings">
                Account Settings
              </Dropdown.Item>
              <hr className="m-0" />
              <Dropdown.Item className="py-2 px-3" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </div>
          )}
        </Dropdown>
      )}
    </div>
  );
}

export default SideBar;
