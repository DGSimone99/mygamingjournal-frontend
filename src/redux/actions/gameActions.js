import axios from "axios";

import { GET_GAMES, GET_GAME } from "./actionTypes";

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
