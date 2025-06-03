import {
  GET_AVAILABLE_PLAYERS_REQUEST,
  GET_AVAILABLE_PLAYERS_SUCCESS,
  GET_AVAILABLE_PLAYERS_FAILURE,
} from "../../actions/actionTypes";

const initialState = {
  players: [],
  totalPages: 0,
  isLoading: false,
  error: null,
};

const availablePlayersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVAILABLE_PLAYERS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case GET_AVAILABLE_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.payload.content,
        totalPages: action.payload.totalPages,
        isLoading: false,
      };

    case GET_AVAILABLE_PLAYERS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
};

export default availablePlayersReducer;
