import { GET_USER_GAME_ENTRIES, UPDATE_ACHIEVEMENT_ENTRY } from "../actions/actionTypes";

const initialState = [];

function gameListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_GAME_ENTRIES:
      return action.payload;

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
