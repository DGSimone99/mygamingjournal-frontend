import { useState } from "react";
import { Container, Dropdown, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateAchievementEntry } from "../../../redux/actions";
import { useParams } from "react-router";

function AchievementsTab({ game }) {
  const dispatch = useDispatch();

  const { gameId } = useParams();
  const gameEntries = useSelector((state) => state.gameEntries || []);
  const [error, setError] = useState("");

  const existingEntry = gameEntries.find((entry) => entry.gameEntryId == gameId);
  const currentGame = existingEntry || game;

  const [unlockedIds, setUnlockedIds] = useState(() =>
    currentGame.achievements.filter((a) => a.unlocked).map((a) => a.id)
  );

  const [numberUnlocked, setNumberUnlocked] = useState(unlockedIds.length);

  const [showLocked, setShowLocked] = useState(true);
  const [showUnlocked, setShowUnlocked] = useState(true);

  const [order, setOrder] = useState("");
  const orderings = [
    { value: "name", label: "Order by Name" },
    { value: "averagePercentage", label: "Order by Rarity" },
  ];

  const sortedAchievements = [...currentGame.achievements]
    .filter((a) => {
      const isUnlocked = unlockedIds.includes(a.id);
      return (isUnlocked && showUnlocked) || (!isUnlocked && showLocked);
    })
    .sort((a, b) => {
      if (order === "name") return a.name.localeCompare(b.name);
      if (order === "averagePercentage") return a.averagePercentage - b.averagePercentage;
      if (order === "") {
        const aUnlocked = unlockedIds.includes(a.id);
        const bUnlocked = unlockedIds.includes(b.id);

        if (aUnlocked !== bUnlocked) return bUnlocked - aUnlocked;

        return a.achievementId - b.achievementId;
      }
    });

  const handleUnlockAll = () => {
    if (!existingEntry) {
      setError("You must add this game to unlock achievements");
      return;
    }

    setError("");
    currentGame.achievements.forEach((achievement) => {
      const isUnlockedLocally = unlockedIds.includes(achievement.id);
      if (!isUnlockedLocally) {
        dispatch(updateAchievementEntry(achievement.id, true));
      }
    });
    const allIds = currentGame.achievements.map((a) => a.id);
    setUnlockedIds(allIds);
    setNumberUnlocked(allIds.length);
  };

  const handleAchievement = (achievement) => {
    if (existingEntry) {
      setError("");
      dispatch(updateAchievementEntry(achievement.id, !achievement.unlocked));
      setUnlockedIds((prev) =>
        prev.includes(achievement.id) ? prev.filter((id) => id !== achievement.id) : [...prev, achievement.id]
      );
      setNumberUnlocked(unlockedIds.length - 1);
    } else {
      setError("You must add this game to unlock achievements");
    }
  };

  return (
    <Container className="achievements-tab">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">{game.achievements.length} Achievements</h2>
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

      {existingEntry && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className={`m-0 ${game.achievements.length == numberUnlocked ? "text-success" : "color-text-secondary"}`}>
            {numberUnlocked} <span className="color-text">/ {game.achievements.length}</span>
          </p>
          {existingEntry ? (
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
          ) : (
            <p className="m-0 text-danger">{error}</p>
          )}
          <p className="m-0  pointer-underline" onClick={handleUnlockAll}>
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
          <Image src={achievement.image} alt={achievement.name} className="me-3" />
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
