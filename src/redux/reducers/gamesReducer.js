import { GET_GAMES } from "../actions/actionTypes";

const initialState = {
  games: [],
  totalPages: 0,
  currentPage: 0,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload.games,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    default:
      return state;
  }
};

export default gamesReducer;
