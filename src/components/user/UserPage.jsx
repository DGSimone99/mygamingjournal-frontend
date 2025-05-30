import { Button, Collapse, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import NoUser from "../../assets/NoUser.png";
import allLanguages from "../../utils/allLanguages";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchCurrentUser, fetchReviewsByCurrentUser, fetchReviewsByUser, fetchUser } from "../../redux/actions";
import { FaCheck, FaClock, FaGamepad, FaRegHeart, FaTrophy } from "react-icons/fa";
import StatCard from "./StatCard";
import { ChevronDown } from "react-bootstrap-icons";
import PaginationControls from "../common/PaginationControls";
import ReviewCard from "../review/ReviewCard";
import { GrCatalog } from "react-icons/gr";

const UserPage = () => {
  const user = useSelector((state) => state.user.user);
  const otherUser = useSelector((state) => state.otherUser.user);
  const userStats = useSelector((state) => state.userStats.userStats);
  const reviews = useSelector((state) => state.reviews.reviews);
  const reviewsPages = useSelector((state) => state.reviews.totalPages);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [linkJournal, setLinkJournal] = useState("/myJournal");

  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState(null);

  function getLanguageLabel(code) {
    const match = allLanguages.find((lang) => lang.value === code);
    return match ? match.label : code;
  }

  useEffect(() => {
    if (location.pathname === "/user/me") {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(fetchUser(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (location.pathname === "/user/me") {
      setUserData(user);
    } else {
      setUserData(otherUser);
    }
  }, [userId, user, otherUser, navigate]);

  useEffect(() => {
    if (user && userId === user.id.toString() && location.pathname !== "/user/me") {
      navigate("/user/me");
    }
  }, [userId, user, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname === "/user/me") {
      dispatch(fetchReviewsByCurrentUser(page, 5));
    } else {
      dispatch(fetchReviewsByUser(userId, page, 5));
      setLinkJournal(`/journal/${userId}`);
    }
  }, [user, userId, page, dispatch]);

  if (!userData || !userStats) {
    return <div className="text-white px-5 py-5">Loading profile...</div>;
  }

  const level = userStats.level;
  const exp = userStats.experience;
  const progressPercentage = Math.min(((exp % 500) / 500) * 100, 100);

  return (
    <Container fluid className="py-5 mb-5 px-5">
      <div className="d-flex gap-3 align-items-center">
        <h1 className="display-5 fw-bold">{userData?.displayName}</h1>
        {userId && <Button className="btn-confirm">Follow</Button>}
      </div>

      <div className="d-flex align-items-start gap-5 my-4">
        <div className="user-hero bg-gradient p-4 rounded-4 shadow-lg mb-4 text-center">
          <Image
            src={userData?.avatarUrl || NoUser}
            height={200}
            className="rounded-circle border border-secondary shadow-sm"
            alt="User Avatar"
          />
          <h2 className="mt-3">{userData?.displayName}</h2>
          <p className="text-secondary">@{userData?.username}</p>

          <div className="level-box">
            <div className="level-label">Level {level}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="exp-label">{exp % 500} / 500 EXP</div>
          </div>
        </div>

        <div className="flex-grow-1 w-100">
          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
            <h4 className="mb-3">Stats</h4>
            <div className="d-flex flex-wrap gap-3 justify-content-between">
              <StatCard label="Game Entries" value={userStats?.totalGames} icon={<FaGamepad />} />
              <StatCard label="Completed Games" value={userStats?.completedGamesCount} icon={<FaCheck />} />
              <StatCard label="Wishlisted Games" value={userStats?.wishlistedGamesCount} icon={<FaRegHeart />} />
              <StatCard label="Achievements" value={userStats?.unlockedAchievements} icon={<FaTrophy />} />
              <StatCard label="Hours Played" value={userStats?.totalHoursPlayed} icon={<FaClock />} />
            </div>

            <Button
              size="sm"
              className="position-absolute top-0 end-0 m-3 bg-transparent border-secondary primary-hover d-flex align-items-center"
              onClick={() => navigate(linkJournal)}
            >
              <GrCatalog className="me-2" />
              Watch Journal
            </Button>
          </div>

          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4">
            <h4 className="mb-3">Bio</h4>
            <p className="mb-0 text-secondary">{userData?.bio || "No bio available."}</p>
          </div>

          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4">
            <h4 className="mb-3">Languages</h4>
            <div className="d-flex flex-wrap gap-2">
              {userData?.language?.length > 0 ? (
                userData.language.map((langCode) => (
                  <span key={langCode} className="badge bg-primary px-3 py-2 fs-6">
                    {getLanguageLabel(langCode)}
                  </span>
                ))
              ) : (
                <span className="text-secondary">No languages set.</span>
              )}
            </div>
          </div>

          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4">
            <div
              onClick={() => setOpen(!open)}
              className="d-flex align-items-center justify-content-between pointer text-white mb-1"
            >
              <h4 className="mb-0">{userData?.displayName}'s Reviews</h4>
              <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={24} />
            </div>

            <Collapse in={open}>
              <div className="mt-3 overflow-auto">
                {reviewsPages >= 1 && (
                  <PaginationControls currentPage={page} totalPages={reviewsPages} onPageChange={setPage} />
                )}
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div className="border border-secondary rounded-3 shadow-sm mb-3">
                      <ReviewCard key={review.id} review={review} yourReview={false} userView={true} />
                    </div>
                  ))
                ) : (
                  <p className="text-secondary">No reviews yet.</p>
                )}
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserPage;
