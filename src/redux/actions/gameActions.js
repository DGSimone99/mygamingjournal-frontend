import axios from "axios";

import { GET_GAMES, GET_GAME, GET_REVIEWS } from "./actionTypes";

export const fetchGames = (filters = {}) => {
  return async (dispatch) => {
    try {
      let fetchedGames = await axios.get(`/api/games`, { params: filters });
      dispatch({
        type: GET_GAMES,
        payload: {
          games: fetchedGames.data.content,
          totalPages: fetchedGames.data.totalPages,
          currentPage: fetchedGames.data.number,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      let detailGame = await axios.get(`/api/games/details/` + id);
      dispatch({
        type: GET_GAME,
        payload: {
          game: detailGame.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchReviewsByGame = (idGame, page, size = 10) => {
  return async (dispatch) => {
    try {
      let fetchedReviews = await axios.get(`/api/reviews/game/` + idGame + `/?page=${page}&size=${size}`);
      dispatch({
        type: GET_REVIEWS,
        payload: {
          reviews: fetchedReviews.data.content,
          totalPages: fetchedReviews.data.totalPages,
          currentPage: fetchedReviews.data.number,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postReview = (idGame, text, score) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/reviews?gameId=${idGame}&text=${text}&score=${score}`);
      dispatch(fetchReviewsByGame(idGame, 0));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteReview = (idReview, idGame) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/reviews/` + idReview);
      dispatch(fetchReviewsByGame(idGame, 0));
    } catch (error) {
      console.log(error);
    }
  };
};
