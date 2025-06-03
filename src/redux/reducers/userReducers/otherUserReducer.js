import { GET_OTHER_USER } from "../../actions/actionTypes";

const initialState = {
  user: null,
};

const otherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OTHER_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default otherUserReducer;
