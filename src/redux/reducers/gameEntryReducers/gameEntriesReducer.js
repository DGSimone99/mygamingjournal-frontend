import { CLEAR_GAME_ENTRIES, GET_USER_GAME_ENTRIES, UPDATE_ACHIEVEMENT_ENTRY } from "../../actions/actionTypes";

const initialState = [];

function gameEntriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_GAME_ENTRIES:
      return action.payload;

    case CLEAR_GAME_ENTRIES:
      return [];

    case UPDATE_ACHIEVEMENT_ENTRY: {
      const updatedAchievement = action.payload;

      return state.map((entry) => {
        if (entry.realGameId !== updatedAchievement.realGameId) return entry;

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

export default gameEntriesReducer;
