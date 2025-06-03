import { CLEAR_GAME_ENTRIES, GET_USER_GAME_ENTRIES_IDS } from "../../actions/actionTypes";

const initialState = [];

const gameEntryIdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_GAME_ENTRIES_IDS:
      return action.payload;

    case CLEAR_GAME_ENTRIES:
      return [];

    default:
      return state;
  }
};

export default gameEntryIdsReducer;
