import { GET_FRIENDS } from "../actions/actionTypes";

const initialState = {
  friends: [],
  totalPages: 0,
  currentPage: 0,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload.content,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.pageNumber,
      };
    default:
      return state;
  }
};

export default friendsReducer;
