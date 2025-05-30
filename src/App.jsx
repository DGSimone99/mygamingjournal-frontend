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
import UserSettings from "./components/user/UserSettings";
import axios from "axios";
import { useDispatch } from "react-redux";
import UserPage from "./components/user/UserPage";
import { fetchCurrentUser, fetchUserStats } from "./redux/actions/userActions";
import { useEffect } from "react";
import { fetchUserGameEntries, fetchUserGameEntriesIds } from "./redux/actions";
import JournalPage from "./components/journal/JournalPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(fetchCurrentUser());
      dispatch(fetchUserStats("me"));
      dispatch(fetchUserGameEntries());
      dispatch(fetchUserGameEntriesIds());
    }
  }, [dispatch]);

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
            <Route path="/catalog/top-rated" element={<CatalogPage />} />
            <Route path="/game/:gameId" element={<GameDetailsPage />} />
            <Route path="/journal/:userId" element={<JournalPage />} />
            <Route path="/myjournal/" element={<JournalPage />} />
            <Route path="/user/settings" element={<UserSettings />} />
            <Route path="/user/me" element={<UserPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
