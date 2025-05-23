import { GET_GAME } from "../actions/actionTypes";

const initialState = {
  game: {},
};

const detailGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAME:
      return action.payload.game;
    default:
      return state;
  }
};

export default detailGameReducer;
