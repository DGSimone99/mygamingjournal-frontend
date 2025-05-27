import "./App.css";
import "./styles/theme.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import CatalogPage from "./components/catalog/CatalogPage";
import GameDetailsPage from "./components/details-page/GameDetailsPage";
import LoginPage from "./components/login/LoginPage";
import SideBar from "./components/layout/SideBar";
import ThemeButton from "./components/layout/ThemeButton";
import RegisterPage from "./components/login/RegisterPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions";
import UserSettings from "./components/UserSettings";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(fetchUser());
  }

  return (
    <BrowserRouter>
      <>
        <SideBar />
        <div className="main-content mx-3">
          <ThemeButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog/" element={<CatalogPage />} />
            <Route path="/catalog/:paramType/:param" element={<CatalogPage />} />
            <Route path="/game/:gameId" element={<GameDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
