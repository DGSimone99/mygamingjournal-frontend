import { GET_AVAILABLE_PLAYERS } from "../../actions/actionTypes";

const initialState = {
  players: [],
  totalPages: 0,
};

const availablePlayersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVAILABLE_PLAYERS:
      return {
        players: action.payload.content,
        totalPages: action.payload.totalPages,
      };
    default:
      return state;
  }
};

export default availablePlayersReducer;
