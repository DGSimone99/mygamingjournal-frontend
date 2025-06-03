import { GET_FRIENDS_REQUEST, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAILURE } from "../../actions/actionTypes";

const initialState = {
  friends: [],
  totalPages: 0,
  currentPage: 0,
  isLoading: false,
  error: null,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIENDS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.payload.content,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.pageNumber,
        isLoading: false,
      };
    case GET_FRIENDS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default friendsReducer;
