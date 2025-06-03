import { GET_USER, GET_USER_MINIMAL, GET_USER_SETTINGS } from "../../actions/actionTypes";

const initialState = {
  user: null,
  settings: null,
  minimal: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case GET_USER_MINIMAL:
      return {
        ...state,
        minimal: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
