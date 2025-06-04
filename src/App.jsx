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
import { useDispatch } from "react-redux";
import UserPage from "./components/user/UserPage";
import { fetchCurrentUser, fetchUserMinimal, fetchUserSettings } from "./redux/actions/userActions";
import { useEffect } from "react";
import { fetchUserGameEntries, fetchUserGameEntriesIds } from "./redux/actions";
import JournalPage from "./components/journal/JournalPage";
import FriendsPage from "./components/friends/FriendsPage";
import axios from "axios";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const init = async () => {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchUserSettings());
        await dispatch(fetchUserMinimal());

        await dispatch(fetchUserGameEntriesIds());
        await dispatch(fetchUserGameEntries());
      };

      init();
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
            <Route path="/catalog/genre/:genre" element={<CatalogPage />} />
            <Route path="/catalog/top" element={<CatalogPage />} />
            <Route path="/catalog/new" element={<CatalogPage />} />
            <Route path="/catalog/coming" element={<CatalogPage />} />
            <Route path="/game/:gameId" element={<GameDetailsPage />} />
            <Route path="/journal/:userId" element={<JournalPage />} />
            <Route path="/myjournal/" element={<JournalPage />} />
            <Route path="/user/settings" element={<UserSettings />} />
            <Route path="/user/me" element={<UserPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
