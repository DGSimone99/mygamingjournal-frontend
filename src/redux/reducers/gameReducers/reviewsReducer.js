import { GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAILURE } from "../../actions/actionTypes";

const initialState = {
  reviews: [],
  totalPages: 0,
  currentPage: 0,
  isLoading: false,
  error: null,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload.reviews,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        isLoading: false,
      };
    case GET_REVIEWS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default reviewsReducer;
