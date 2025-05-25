import { GET_GAME } from "../actions/actionTypes";

const initialState = {
  game: {},
};

const gameDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME:
      return action.payload.game;
    default:
      return state;
  }
};

export default gameDetailsReducer;
