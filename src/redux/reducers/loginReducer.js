import { LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token") || "",
  username: localStorage.getItem("username") || "",
  roles: [],
};

const loginReducer = (state = initialState, action) => {
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
        token: "",
        username: "",
        roles: [],
      };

    default:
      return state;
  }
};

export default loginReducer;
