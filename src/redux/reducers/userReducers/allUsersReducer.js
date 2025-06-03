import { GET_ALL_USERS } from "../../actions/actionTypes";

const initialState = {
  users: [],
  totalPages: 0,
  currentPage: 0,
};

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.content,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.pageNumber,
      };
    default:
      return state;
  }
};

export default allUsersReducer;
