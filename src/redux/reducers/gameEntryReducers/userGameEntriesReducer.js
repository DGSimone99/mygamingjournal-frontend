import {
  GET_OTHER_USER_GAME_ENTRIES_FAILURE,
  GET_OTHER_USER_GAME_ENTRIES_REQUEST,
  GET_OTHER_USER_GAME_ENTRIES_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  games: [],
  isLoading: false,
  error: null,
};

function otherUserGameEntriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OTHER_USER_GAME_ENTRIES_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_OTHER_USER_GAME_ENTRIES_SUCCESS:
      return { ...state, games: action.payload, isLoading: false };
    case GET_OTHER_USER_GAME_ENTRIES_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

export default otherUserGameEntriesReducer;
