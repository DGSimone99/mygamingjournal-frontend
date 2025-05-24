import { CLEAR_GAME_ENTRIES, GET_USER_GAME_ENTRIES, UPDATE_ACHIEVEMENT_ENTRY } from "../actions/actionTypes";

const initialState = JSON.parse(localStorage.getItem("gameEntries") || "[]");

function gameListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_GAME_ENTRIES:
      localStorage.setItem("gameEntries", JSON.stringify(action.payload));
      return action.payload;

    case CLEAR_GAME_ENTRIES:
      localStorage.removeItem("gameEntries");
      return [];

    case UPDATE_ACHIEVEMENT_ENTRY: {
      const updatedAchievement = action.payload;

      return state.map((entry) => {
        if (entry.gameEntryId !== updatedAchievement.gameEntryId) return entry;

        return {
          ...entry,
          achievements: entry.achievements.map((achievement) =>
            achievement.id === updatedAchievement.id
              ? { ...achievement, unlocked: updatedAchievement.unlocked }
              : achievement
          ),
        };
      });
    }
    default:
      return state;
  }
}

export default gameListReducer;
