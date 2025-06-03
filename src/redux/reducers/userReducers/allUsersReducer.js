import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE } from "../../actions/actionTypes";

const initialState = {
  users: [],
  totalPages: 0,
  currentPage: 0,
  isLoading: false,
  error: null,
};

const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.content,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.pageNumber,
        isLoading: false,
      };
    case GET_ALL_USERS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default allUsersReducer;
