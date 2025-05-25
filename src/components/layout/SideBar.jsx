import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Dropdown, Image, Nav } from "react-bootstrap";
import { GrCatalog } from "react-icons/gr";
import { FaList, FaUser, FaUserFriends, FaChartLine } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchUserGameEntriesIds } from "../../redux/actions";
import NoUser from "../../assets/NoUser.png";

function SideBar() {
  const { isLoggedIn, logout } = useAuth();

  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserGameEntriesIds());
    } else {
      setShowAccountDropdown(false);
    }
  }, [isLoggedIn, dispatch]);

  const genres = [
    { slug: "action", name: "Action" },
    { slug: "indie", name: "Indie" },
    { slug: "adventure", name: "Adventure" },
    { slug: "role-playing-games-rpg", name: "RPG" },
    { slug: "strategy", name: "Strategy" },
    { slug: "shooter", name: "Shooter" },
    { slug: "casual", name: "Casual" },
    { slug: "simulation", name: "Simulation" },
    { slug: "puzzle", name: "Puzzle" },
    { slug: "arcade", name: "Arcade" },
    { slug: "platformer", name: "Platformer" },
    { slug: "racing", name: "Racing" },
    { slug: "sports", name: "Sports" },
    { slug: "fighting", name: "Fighting" },
    { slug: "family", name: "Family" },
    { slug: "board-games", name: "Board Games" },
    { slug: "educational", name: "Educational" },
    { slug: "card", name: "Card" },
  ];

  return (
    <div className="sidebar z-3 h-100 pt-3 d-flex flex-column justify-content-between text-center position-fixed top-0">
      <Button className="border-0 bg-transparent p-0" as={Link} to={"/"}>
        <Image src={Logo} className="sidebar-logo d-block mx-auto" alt="logo" height={60} width={60} />
      </Button>

      <Nav className="sidebar-nav d-flex flex-column gap-3">
        <Dropdown
          className="py-2 fs-7"
          onMouseEnter={() => setShowGenreDropdown(true)}
          onMouseLeave={() => setShowGenreDropdown(false)}
        >
          <Nav.Link as={Link} to="/catalog" className="sidebar-item d-flex align-items-center flex-column gap-2">
            <GrCatalog className="sidebar-icon fs-2" />
            Catalog
          </Nav.Link>
          {showGenreDropdown && (
            <div className="dropdown-menu-custom position-absolute top-0 z-3 p-2 overflow-y-auto">
              {genres.map((genre) => (
                <Dropdown.Item className="py-2 px-3" key={genre.slug} as={Link} to={`/catalog/${genre.slug}`}>
                  {genre.name}
                </Dropdown.Item>
              ))}
            </div>
          )}
        </Dropdown>

        <Nav.Link as={Link} to="/" className="sidebar-item d-flex align-items-center flex-column gap-2">
          <FaList className="sidebar-icon fs-2" />
          Journal
        </Nav.Link>

        <Nav.Link as={Link} to="/" className="sidebar-item d-flex align-items-center flex-column gap-2">
          <FaUserFriends className="sidebar-icon fs-2" />
          Friends
        </Nav.Link>

        <Nav.Link as={Link} to="/" className="sidebar-item d-flex align-items-center flex-column gap-2">
          <IoIosNotifications className="sidebar-icon fs-2" />
          Notifs
        </Nav.Link>

        <Nav.Link as={Link} to="/" className="sidebar-item d-flex align-items-center flex-column gap-2">
          <FaChartLine className="sidebar-icon fs-2" />
          Statistics
        </Nav.Link>
      </Nav>

      {!isLoggedIn ? (
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
          <Nav.Link as={Link} to="/" className="sidebar-item d-flex align-items-center flex-column gap-2 py-2">
            <Image src={NoUser} className="sidebar-image rounded-circle" alt="user" height={40} width={40} /> Account
          </Nav.Link>

          {showAccountDropdown && (
            <div className="dropdown-menu-custom position-absolute top-0 z-3 p-2 overflow-y-auto">
              <Dropdown.Item className="px-3" onClick={handleLogout}>
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
