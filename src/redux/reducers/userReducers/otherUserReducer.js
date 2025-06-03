import { GET_OTHER_USER_REQUEST, GET_OTHER_USER_SUCCESS, GET_OTHER_USER_FAILURE } from "../../actions/actionTypes";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const otherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OTHER_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_OTHER_USER_SUCCESS:
      return { ...state, user: action.payload, isLoading: false };
    case GET_OTHER_USER_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default otherUserReducer;
