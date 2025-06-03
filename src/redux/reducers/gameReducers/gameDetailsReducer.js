import { GET_GAME_REQUEST, GET_GAME_SUCCESS, GET_GAME_FAILURE } from "../../actions/actionTypes";

const initialState = {
  game: null,
  isLoading: false,
  error: null,
};

const gameDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_GAME_SUCCESS:
      return { ...state, game: action.payload.game, isLoading: false };
    case GET_GAME_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default gameDetailsReducer;
