import "./App.css";
import "./styles/theme.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import MainCatalog from "./components/catalog/MainCatalog";
import GameDetailsPage from "./components/details-page/GameDetailsPage";
import LoginPage from "./components/login/LoginPage";
import SideBar from "./components/layout/SideBar";
import ThemeButton from "./components/layout/ThemeButton";
import RegisterPage from "./components/login/RegisterPage";
import TopBar from "./components/layout/TopBar";

function App() {
  return (
    <BrowserRouter>
      <>
        <SideBar />
        <div className="main-content mx-3">
          <ThemeButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog/*" element={<MainCatalog />} />
            <Route path="/game/:gameId" element={<GameDetailsPage />} />
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
