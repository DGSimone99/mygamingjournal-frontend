import { useEffect, useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateAchievementEntry } from "../../../redux/actions";
import { useParams } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import NoAchievement from "../../../assets/NoAchievement.png";

function AchievementsTab({ game }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const { gameId } = useParams();

  const userEntry = useSelector((state) =>
    state.gameEntries.find((entry) => String(entry.realGameId) === String(gameId))
  );

  const [unlockedIds, setUnlockedIds] = useState([]);
  const [error, setError] = useState("");
  const [showLocked, setShowLocked] = useState(true);
  const [showUnlocked, setShowUnlocked] = useState(true);
  const [order, setOrder] = useState("");

  const orderings = [
    { value: "name", label: "Order by Name" },
    { value: "averagePercentage", label: "Order by Rarity" },
  ];

  useEffect(() => {
    if (userEntry?.achievements?.length > 0) {
      const initialUnlocked = userEntry.achievements.filter((a) => a.unlocked).map((a) => a.achievementId);
      setUnlockedIds(initialUnlocked);
    } else {
      setUnlockedIds([]);
    }
    if (!isLoggedIn) {
      setUnlockedIds([]);
    }
  }, [userEntry, isLoggedIn]);

  const sortedAchievements = [...game.achievements]
    .filter((a) => {
      const isUnlocked = unlockedIds.includes(a.id);
      return (isUnlocked && showUnlocked) || (!isUnlocked && showLocked);
    })
    .sort((a, b) => {
      if (order === "name") return a.name.localeCompare(b.name);
      if (order === "averagePercentage") return a.averagePercentage - b.averagePercentage;

      const aUnlocked = unlockedIds.includes(a.id);
      const bUnlocked = unlockedIds.includes(b.id);

      if (aUnlocked !== bUnlocked) return bUnlocked - aUnlocked;
      return a.id - b.id;
    });

  const handleUnlockAll = () => {
    if (!userEntry) {
      setError("You must add this game to unlock achievements");
      return;
    }

    setError("");

    userEntry.achievements.forEach((entry) => {
      if (!unlockedIds.includes(entry.achievementId)) {
        dispatch(updateAchievementEntry(entry.id, true));
      }
    });

    const allIds = userEntry.achievements.map((a) => a.achievementId);
    setUnlockedIds(allIds);
  };

  const handleAchievement = (achievement) => {
    if (!userEntry || !isLoggedIn) {
      setError("You must add this game to unlock achievements");
      return;
    }

    setError("");

    const entry = userEntry.achievements.find((e) => e.achievementId === achievement.id);
    if (!entry) return;

    const isUnlocked = unlockedIds.includes(entry.achievementId);
    dispatch(updateAchievementEntry(entry.id, !isUnlocked));

    setUnlockedIds((prev) =>
      isUnlocked ? prev.filter((id) => id !== entry.achievementId) : [...prev, entry.achievementId]
    );
  };

  return (
    <Container className="achievements-tab">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">{game.achievements.length} Achievements</h2>
        <p className="m-0 text-danger">{error}</p>
        <Form.Select
          aria-label="Order by"
          className="input-field-filter fw-bold border-0"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="">Default Order</option>
          {orderings.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </div>

      {isLoggedIn && userEntry && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p
            className={`m-0 ${
              game.achievements.length === unlockedIds.length ? "text-success" : "color-text-secondary"
            }`}
          >
            {unlockedIds.length} <span className="color-text">/ {game.achievements.length}</span>
          </p>

          <div className="d-flex align-items-center gap-3">
            <Form.Check
              type="checkbox"
              label="Show unlocked"
              checked={showUnlocked}
              onChange={(e) => setShowUnlocked(e.target.checked)}
              className="m-0 d-flex align-items-center"
            />
            <Form.Check
              type="checkbox"
              label="Show locked"
              checked={showLocked}
              onChange={(e) => setShowLocked(e.target.checked)}
              className="m-0 d-flex align-items-center"
            />
          </div>

          <p className="m-0 pointer-underline" onClick={handleUnlockAll}>
            Unlock all achievements
          </p>
        </div>
      )}

      {sortedAchievements.map((achievement) => (
        <div
          key={achievement.id}
          className={`achievement ${
            !unlockedIds.includes(achievement.id) ? "locked" : ""
          } d-flex align-items-center rounded mb-3 pointer-list`}
          onClick={() => handleAchievement(achievement)}
        >
          <Image src={achievement.image || NoAchievement} alt={achievement.name} className="me-3 achievement-image" />
          <div>
            <h3>{achievement.name}</h3>
            <p>{achievement.description}</p>
          </div>
          <div className="ms-auto me-3 fw-bold">
            <p>{achievement.averagePercentage}%</p>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default AchievementsTab;
