import axios from "axios";

import { GET_GAMES, GET_GAME, LOGIN, GET_USER_GAME_ENTRIES, UPDATE_ACHIEVEMENT_ENTRY } from "./actionTypes";

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

export const loginFetch = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/auth/login`, credentials);
      const { token, username, roles } = response.data;

      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN,
        payload: { token, username, roles },
      });

      return token;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  };
};

export const registerFetch = (formData) => {
  return async () => {
    try {
      await axios.post("/api/auth/register", formData);
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };
};

export const logoutFetch = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch({
        type: LOGIN,
        payload: {
          token: "",
          username: "",
          roles: [],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveGameEntry = (game, method) => {
  return async () => {
    try {
      const token = localStorage.getItem("token");

      const params = new URLSearchParams();
      params.append("idGame", game.idGame);
      if (game.hoursPlayed) params.append("hoursPlayed", game.hoursPlayed);
      if (game.personalRating) params.append("personalRating", game.personalRating);
      if (game.status) params.append("status", game.status);
      if (game.completionMode) params.append("completionMode", game.completionMode);
      if (game.notes) params.append("notes", game.notes);

      await axios({
        method,
        url: "/api/my-library",
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserGameEntries = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/my-library", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_USER_GAME_ENTRIES, payload: response.data });
    } catch (error) {
      console.error("Error fetching user game entries", error);
    }
  };
};

export const updateAchievementEntry = (id, unlocked) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `/api/achievement-entries/${id}`,
        { unlocked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_ACHIEVEMENT_ENTRY,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error updating achievement entry", error);
    }
  };
};
