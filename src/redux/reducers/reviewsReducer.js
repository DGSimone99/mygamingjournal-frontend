import { GET_REVIEWS } from "../actions/actionTypes";

const initialState = {
  reviews: [],
  totalPages: 0,
  currentPage: 0,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload.reviews,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    default:
      return state;
  }
};

export default reviewsReducer;
