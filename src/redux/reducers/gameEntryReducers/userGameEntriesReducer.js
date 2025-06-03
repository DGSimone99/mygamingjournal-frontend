import { GET_OTHER_USER_GAME_ENTRIES } from "../../actions/actionTypes";

const initialState = [];

function otherUserGameEntriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OTHER_USER_GAME_ENTRIES:
      return action.payload;
    default:
      return state;
  }
}

export default otherUserGameEntriesReducer;
