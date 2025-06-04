import axios from "axios";
import { GET_REVIEWS_FAILURE, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS } from "./actionTypes";

const fetchReviewsGeneric = (url, page = 0, size = 10) => {
  return async (dispatch) => {
    dispatch({ type: GET_REVIEWS_REQUEST });
    try {
      const res = await axios.get(`${url}?page=${page}&size=${size}`);
      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: {
          reviews: res.data.content,
          totalPages: res.data.totalPages,
          currentPage: res.data.number,
        },
      });
    } catch (error) {
      dispatch({ type: GET_REVIEWS_FAILURE, error: error.message });
    }
  };
};

export const fetchReviewsByGame = (idGame, page = 0, size = 10) =>
  fetchReviewsGeneric(`/api/reviews/game/${idGame}`, page, size);

export const fetchReviewsByUser = (idUser, page = 0, size = 10) =>
  fetchReviewsGeneric(`/api/reviews/user/${idUser}`, page, size);

export const fetchReviewsByCurrentUser = (page = 0, size = 10) => fetchReviewsGeneric(`/api/reviews/me`, page, size);

export const postReview = (idGame, text, score) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/reviews", { gameId: idGame, text, score });
      dispatch(fetchReviewsByGame(idGame, 0));
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };
};

export const deleteReview = (idReview, idGame) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/reviews/${idReview}`);
      dispatch(fetchReviewsByGame(idGame, 0));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
};
