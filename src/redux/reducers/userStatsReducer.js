import { GET_USER_STATS } from "../actions/actionTypes";

const initialState = {
  userStats: null,
};

const userStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STATS:
      return {
        ...state,
        userStats: action.payload,
      };
    default:
      return state;
  }
};

export default userStatsReducer;
