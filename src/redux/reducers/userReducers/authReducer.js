import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "../../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  roles: [],
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        roles: action.payload.roles,
        isLoading: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case LOGOUT:
      return {
        token: null,
        username: null,
        roles: [],
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
