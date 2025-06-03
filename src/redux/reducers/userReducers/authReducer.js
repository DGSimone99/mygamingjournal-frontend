import { LOGIN, LOGOUT } from "../../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  roles: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        roles: action.payload.roles,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        username: null,
        roles: [],
      };
    default:
      return state;
  }
};

export default authReducer;
