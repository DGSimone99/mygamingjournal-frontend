import { useEffect, useState } from "react";
import { Button, Col, Collapse, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  fetchCurrentUser,
  fetchReviewsByCurrentUser,
  fetchReviewsByUser,
  fetchUser,
  toggleFollowFetch,
} from "../../redux/actions";

import NoUser from "../../assets/NoUser.png";
import allLanguages from "../../utils/allLanguages";
import { FaCheck, FaClock, FaGamepad, FaRegHeart, FaTrophy } from "react-icons/fa";
import { ChevronDown } from "react-bootstrap-icons";
import { GrCatalog } from "react-icons/gr";
import { RiQuillPenAiLine } from "react-icons/ri";
import StatCard from "./StatCard";
import PaginationControls from "../common/PaginationControls";
import ReviewCard from "../review/ReviewCard";

function UserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const isLoggedIn = useSelector((state) => Boolean(state.auth.token));
  const user = useSelector((state) => state.user.user);
  const otherUser = useSelector((state) => state.otherUser.user);
  const reviews = useSelector((state) => state.reviews.reviews);
  const reviewsPages = useSelector((state) => state.reviews.totalPages);
  const friends = useSelector((state) => state.friends.friends);

  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(0);
  const [linkJournal, setLinkJournal] = useState("");
  const [open, setOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (location.pathname === "/user/me") {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(fetchUser(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const data = location.pathname === "/user/me" ? user : otherUser;
    setUserData(data);
  }, [userId, user, otherUser]);

  useEffect(() => {
    if (user && userId === user.id.toString() && location.pathname !== "/user/me") {
      navigate("/user/me");
    }
  }, [userId, user, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname === "/user/me") {
      dispatch(fetchReviewsByCurrentUser(page, 5));
      setLinkJournal("/myJournal");
    } else {
      dispatch(fetchReviewsByUser(userId, page, 5));
      setLinkJournal(`/journal/${userId}`);
    }
  }, [user, userId, page, dispatch]);

  useEffect(() => {
    setIsFollowing(friends.some((f) => f.id === userData?.id));
  }, [friends, userData]);

  function getLanguageLabel(code) {
    const match = allLanguages.find((lang) => lang.value === code);
    return match ? match.label : code;
  }

  if (!userData) {
    return <div className="text-center px-5 py-5">Loading profile...</div>;
  }

  const level = userData.level;
  const exp = userData.experience;
  const progressPercentage = Math.min(((exp % 1000) / 1000) * 100, 100);

  return (
    <Container fluid className="py-5 mb-5 px-5">
      <div className="d-flex gap-3 align-items-center">
        <h1 className="display-5 fw-bold">{userData.displayName}</h1>
        {userId && isLoggedIn ? (
          <Button
            className={`border-0 rounded-5 ${isFollowing ? "bg-secondary" : "bg-primary"} primary-hover`}
            onClick={() => dispatch(toggleFollowFetch(userId))}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        ) : (
          !userId && (
            <Button className="btn-confirm" onClick={() => navigate("/user/settings")}>
              <RiQuillPenAiLine /> Edit
            </Button>
          )
        )}
      </div>

      <div className="d-flex align-items-start gap-5 my-4">
        <div className="user-hero bg-gradient p-4 rounded-4 shadow-lg mb-4 text-center">
          <Image
            src={userData.avatarUrl || NoUser}
            height={200}
            width={200}
            className="rounded-circle border border-secondary shadow-sm"
            alt="User Avatar"
          />
          <h2 className="mt-3">{userData.displayName}</h2>
          <p className="text-secondary">@{userData.username}</p>

          <div className="level-box">
            <div className="level-label">Level {level}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="exp-label">{exp % 1000} / 1000 EXP</div>
          </div>
          <div className="text-secondary">
            Joined on{" "}
            {new Date(userData.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="flex-grow-1 w-100">
          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4 position-relative">
            <h4 className="mb-3">Stats</h4>
            <div className="d-flex flex-wrap gap-3 justify-content-between">
              <StatCard label="Game Entries" value={userData.totalGames} icon={<FaGamepad />} />
              <StatCard label="Completed Games" value={userData.completedGamesCount} icon={<FaCheck />} />
              <StatCard label="Wishlisted Games" value={userData.wishlistedGamesCount} icon={<FaRegHeart />} />
              <StatCard label="Achievements" value={userData.unlockedAchievements} icon={<FaTrophy />} />
              <StatCard label="Hours Played" value={userData.totalHoursPlayed} icon={<FaClock />} />
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
            <h4 className="mb-3">Contacts</h4>
            <Row className="text-secondary">
              {userData.steamUsername && (
                <Col md={6} className="my-3">
                  <strong>Steam:</strong>{" "}
                  <span className="ms-2 bg-primary border rounded py-1 px-2 border-secondary">
                    {userData.steamUsername}
                  </span>
                </Col>
              )}
              {userData.epicUsername && (
                <Col md={6} className="my-3">
                  <strong>Epic Games:</strong>{" "}
                  <span className="ms-2 bg-primary border rounded py-1 px-2 border-secondary">
                    {userData.epicUsername}
                  </span>
                </Col>
              )}
              {userData.xboxUsername && (
                <Col md={6} className="my-3">
                  <strong>Xbox:</strong>{" "}
                  <span className="ms-2 bg-primary border rounded py-1 px-2 border-secondary">
                    {userData.xboxUsername}
                  </span>
                </Col>
              )}
              {userData.nintendoUsername && (
                <Col md={6} className="my-3">
                  <strong>Nintendo:</strong>{" "}
                  <span className="ms-2 bg-primary border rounded py-1 px-2 border-secondary">
                    {userData.nintendoUsername}
                  </span>
                </Col>
              )}
              {userData.psnUsername && (
                <Col md={6} className="my-3">
                  <strong>PlayStation:</strong>{" "}
                  <span className="ms-2 bg-primary border rounded py-1 px-2 border-secondary">
                    {userData.psnUsername}
                  </span>
                </Col>
              )}
              {userData.riotId && (
                <Col md={6} className="my-3">
                  <strong>Riot ID:</strong>{" "}
                  <span className="ms-2 bg-primary border rounded py-1 px-2 border-secondary">{userData.riotId}</span>
                </Col>
              )}
              {userData.discordTag && (
                <Col md={6} className="my-3">
                  <strong>Discord:</strong>{" "}
                  <span className="ms-2 bg-primary border rounded py-1 px-2 border-secondary">
                    {userData.discordTag}
                  </span>
                </Col>
              )}
              {!userData.steamUsername &&
                !userData.epicUsername &&
                !userData.xboxUsername &&
                !userData.nintendoUsername &&
                !userData.psnUsername &&
                !userData.riotId &&
                !userData.discordTag && <p className="text-secondary mb-0">No contacts available.</p>}
            </Row>
          </div>

          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4">
            <h4 className="mb-3">Bio</h4>
            <p className="mb-0 text-secondary">{userData.bio || "No bio available."}</p>
          </div>

          <div className="bg-dark p-4 rounded-3 border border-secondary shadow-sm mb-4">
            <h4 className="mb-3">Languages</h4>
            <div className="d-flex flex-wrap gap-2">
              {userData.languages?.length > 0 ? (
                userData.languages.map((langCode) => (
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
              <h4 className="mb-0">{userData.displayName}'s Reviews</h4>
              <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={24} />
            </div>

            <Collapse in={open}>
              <div className="mt-3 overflow-auto">
                {reviewsPages >= 1 && (
                  <PaginationControls currentPage={page} totalPages={reviewsPages} onPageChange={setPage} />
                )}
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div className="border border-secondary rounded-3 shadow-sm mb-3" key={review.id}>
                      <ReviewCard review={review} yourReview={false} userView={true} />
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
}

export default UserPage;
