import axios from "axios";
import {
  GET_GAMES_REQUEST,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  GET_GAME_REQUEST,
  GET_GAME_SUCCESS,
  GET_GAME_FAILURE,
} from "./actionTypes";

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

export const fetchGames =
  (set, params = {}) =>
  async (dispatch) => {
    dispatch({ type: GET_GAMES_REQUEST, payload: { set } });

    try {
      const res = await axios.get("/api/games", { params });
      dispatch({
        type: GET_GAMES_SUCCESS,
        payload: {
          set,
          games: res.data.content,
          totalPages: res.data.totalPages,
          currentPage: res.data.number,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_GAMES_FAILURE,
        payload: { set, error: error.message },
      });
    }
  };
