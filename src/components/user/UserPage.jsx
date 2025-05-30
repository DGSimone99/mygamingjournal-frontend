import { Button, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import NoUser from "../../assets/NoUser.png";
import allLanguages from "../../utils/allLanguages";
import { RiQuillPenAiLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { fetchUser } from "../../redux/actions";
import { FaCheck, FaClock, FaGamepad, FaRegHeart, FaTrophy } from "react-icons/fa";
import StatCard from "./StatCard";

const UserPage = () => {
  const user = useSelector((state) => state.user.user);
  const otherUser = useSelector((state) => state.otherUser.user);
  const userStats = useSelector((state) => state.userStats.userStats);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  function getLanguageLabel(code) {
    const match = allLanguages.find((lang) => lang.value === code);
    return match ? match.label : code;
  }

  useEffect(() => {
    if (location.pathname === "/user/me") {
      dispatch(fetchUser("me"));
      setUserData(user);
    } else if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId, location.pathname]);

  useEffect(() => {
    if (userId && otherUser) {
      setUserData(otherUser);
    }
  }, [otherUser]);

  useEffect(() => {
    if (location.pathname === "/user/me" && user) {
      setUserData(user);
    }
  }, [user]);

  if (!userData) {
    return <div className="text-white">Loading user...</div>;
  }

  return (
    user && (
      <Container fluid className="page text-white py-5 mb-5 px-5">
        <div className="d-flex gap-3 align-items-center">
          <h1 className="display-5 fw-bold">{userData?.displayName}</h1>
          {!userId && <Button className="btn-confirm">Follow</Button>}
        </div>
        <div className="d-flex align-items-start gap-5 my-4">
          <div className="user-hero bg-gradient position-relative p-4 rounded-4 mb-4 shadow-lg">
            <Image
              src={userData?.avatarUrl || NoUser}
              height={200}
              className="rounded-circle border border-secondary shadow-sm"
            />
            <h2 className="mt-3">{userData?.displayName}</h2>
            <p className="text-secondary">@{userData?.username}</p>
            <div className="level-box">
              <div className="level-label">Level {userStats?.level}</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(((userStats?.experience % 500) / 500) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <div className="exp-label">{userStats?.experience % 500} / 500 EXP</div>
            </div>
          </div>
          <div className="flex-grow-1 w-100">
            <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
              <h4 className="mb-3">Stats</h4>
              <div className="d-flex flex-wrap gap-3 justify-content-between">
                <StatCard label="Game Entries" value={userStats?.totalGames || 0} icon={<FaGamepad />} />
                <StatCard label="Completed Games" value={userStats?.completedGamesCount || 0} icon={<FaCheck />} />
                <StatCard label="Wishlisted Games" value={userStats?.wishlistedGamesCount || 0} icon={<FaRegHeart />} />
                <StatCard label="Achievements" value={userStats?.unlockedAchievements || 0} icon={<FaTrophy />} />
                <StatCard label="Hours Played" value={userStats?.totalHoursPlayed || 0} icon={<FaClock />} />

                <Button
                  size="sm"
                  className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover"
                >
                  Watch Journal
                </Button>
              </div>
            </div>

            <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
              <h4 className="mb-3">Bio </h4>
              <p className="mb-0 text-secondary">{user.bio || "No bio available."}</p>
            </div>
            <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
              <h4 className="mb-3">Languages </h4>
              <div className="d-flex flex-wrap gap-2">
                {user.language.map((langCode) => (
                  <span key={langCode} className="badge bg-primary px-3 py-2 fs-6">
                    {getLanguageLabel(langCode)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  );
};

export default UserPage;
