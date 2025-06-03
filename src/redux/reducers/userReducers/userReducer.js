import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_MINIMAL_REQUEST,
  GET_USER_MINIMAL_SUCCESS,
  GET_USER_MINIMAL_FAILURE,
  GET_USER_SETTINGS_REQUEST,
  GET_USER_SETTINGS_SUCCESS,
  GET_USER_SETTINGS_FAILURE,
} from "../../actions/actionTypes";

const initialState = {
  user: null,
  settings: null,
  minimal: null,
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case GET_USER_SETTINGS_REQUEST:
    case GET_USER_MINIMAL_REQUEST:
      return { ...state, isLoading: true, error: null };

    case GET_USER_SUCCESS:
      return { ...state, user: action.payload, isLoading: false };

    case GET_USER_SETTINGS_SUCCESS:
      return { ...state, settings: action.payload, isLoading: false };

    case GET_USER_MINIMAL_SUCCESS:
      return { ...state, minimal: action.payload, isLoading: false };

    case GET_USER_FAILURE:
    case GET_USER_SETTINGS_FAILURE:
    case GET_USER_MINIMAL_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
};

export default userReducer;
