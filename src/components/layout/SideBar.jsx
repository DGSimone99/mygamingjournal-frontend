import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Dropdown, Image, Nav } from "react-bootstrap";
import { GrCatalog } from "react-icons/gr";
import { FaList, FaUser, FaUserFriends, FaChartLine } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchUserGameEntries } from "../../redux/actions";

function SideBar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownAccount, setShowDropdownAccount] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setShowDropdownAccount(false);
    }
    if (isLoggedIn) {
      dispatch(fetchUserGameEntries());
    }
  }, [isLoggedIn]);

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
          className="sidebar-item py-2 fs-7 catalogo-dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div onClick={() => navigate("/catalog")}>
            <GrCatalog className="sidebar-icon fs-2" />
            <Nav.Link>Catalog</Nav.Link>
          </div>
          {showDropdown && (
            <div className="dropdown-menu-custom position-absolute top-0 z-3 p-2 overflow-y-auto">
              {genres.map((genre) => (
                <Dropdown.Item className="py-2 px-3" key={genre.slug} as={Link} to={`/catalog/${genre.slug}`}>
                  {genre.name}
                </Dropdown.Item>
              ))}
            </div>
          )}
        </Dropdown>

        <div className="sidebar-item py-2 fs-7">
          <FaList className="sidebar-icon fs-2" />
          <Nav.Link as={Link} to={"/"}>
            Journal
          </Nav.Link>
        </div>

        <div className="sidebar-item py-2 fs-7">
          <FaUserFriends className="sidebar-icon fs-2" />
          <Nav.Link as={Link} to={"/"}>
            Friends
          </Nav.Link>
        </div>

        <div className="sidebar-item py-2 fs-7">
          <IoIosNotifications className="sidebar-icon fs-2" />
          <Nav.Link as={Link} to={"/"}>
            Notifs
          </Nav.Link>
        </div>

        <div className="sidebar-item py-2 fs-7">
          <FaChartLine className="sidebar-icon fs-2" />
          <Nav.Link as={Link} to={"/"}>
            Statistics
          </Nav.Link>
        </div>
      </Nav>

      {!isLoggedIn ? (
        <div className="sidebar-item py-2 fs-7" onClick={() => navigate("/login")}>
          <FaUser className="sidebar-icon fs-2" />
          <Nav.Link>Login</Nav.Link>
        </div>
      ) : (
        <Dropdown
          className="sidebar-item py-2 fs-7 catalogo-dropdown"
          onMouseEnter={() => setShowDropdownAccount(true)}
          onMouseLeave={() => setShowDropdownAccount(false)}
        >
          <div onClick={() => navigate("/")}>
            <FaUser className="sidebar-icon fs-2" />
            <Nav.Link as={Link} to={"/"}>
              Account
            </Nav.Link>
          </div>
          {showDropdownAccount && (
            <div className="dropdown-menu-custom position-absolute top-0 z-3 p-2 overflow-y-auto">
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
