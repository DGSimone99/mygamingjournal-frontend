import { GET_GAMES_FAILURE, GET_GAMES_REQUEST, GET_GAMES_SUCCESS } from "../../actions/actionTypes";

const initialState = {
  sets: {},
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES_REQUEST:
      return {
        ...state,
        sets: {
          ...state.sets,
          [action.payload.set]: {
            ...(state.sets[action.payload.set] || {}),
            isLoading: true,
            error: null,
          },
        },
      };
    case GET_GAMES_SUCCESS:
      return {
        ...state,
        sets: {
          ...state.sets,
          [action.payload.set]: {
            games: action.payload.games,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
            isLoading: false,
            error: null,
          },
        },
      };
    case GET_GAMES_FAILURE:
      return {
        ...state,
        sets: {
          ...state.sets,
          [action.payload.set]: {
            ...(state.sets[action.payload.set] || {}),
            isLoading: false,
            error: action.payload.error,
          },
        },
      };
    default:
      return state;
  }
};

export default gamesReducer;
