import { GET_GAMES_REQUEST, GET_GAMES_SUCCESS, GET_GAMES_FAILURE } from "../../actions/actionTypes";

const initialState = {
  games: [],
  totalPages: 0,
  currentPage: 0,
  isLoading: false,
  error: null,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_GAMES_SUCCESS:
      return {
        ...state,
        games: action.payload.games,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        isLoading: false,
      };
    case GET_GAMES_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default gamesReducer;
