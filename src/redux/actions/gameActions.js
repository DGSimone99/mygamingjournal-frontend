import axios from "axios";
import {
  GET_GAMES_REQUEST,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  GET_GAME_REQUEST,
  GET_GAME_SUCCESS,
  GET_GAME_FAILURE,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
} from "./actionTypes";

export const fetchGames = (filters = {}) => {
  return async (dispatch) => {
    dispatch({ type: GET_GAMES_REQUEST });
    try {
      const res = await axios.get("/api/games", { params: filters });
      dispatch({
        type: GET_GAMES_SUCCESS,
        payload: {
          games: res.data.content,
          totalPages: res.data.totalPages,
          currentPage: res.data.number,
        },
      });
    } catch (error) {
      dispatch({ type: GET_GAMES_FAILURE, error: error.message });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_GAME_REQUEST });
    try {
      const res = await axios.get(`/api/games/details/${id}`);
      dispatch({ type: GET_GAME_SUCCESS, payload: { game: res.data } });
    } catch (error) {
      dispatch({ type: GET_GAME_FAILURE, error: error.message });
    }
  };
};

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
