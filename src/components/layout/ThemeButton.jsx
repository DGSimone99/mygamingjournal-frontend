import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Button } from "react-bootstrap";
import { FaMoon, FaChevronRight } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);

  return (
    <div
      className={`theme-container border border-1 border-secondary border-end-0 d-sm-none ${
        open ? "open" : ""
      } position-fixed top-0 end-0 z-3 p-2`}
    >
      <div className="theme-inner p-2 d-flex align-items-center overflow-hidden">
        <Button onClick={() => setOpen(!open)} className="theme-toggle p-0 bg-transparent border-0">
          <FaChevronRight />
        </Button>

        {open && (
          <Button onClick={toggleTheme} className="d-flex align-items-center fs-4 me-2 bg-transparent border-0">
            {theme === "dark" ? <FaMoon /> : <MdSunny />}
          </Button>
        )}
      </div>
    </div>
  );
}
export default ThemeButton;
