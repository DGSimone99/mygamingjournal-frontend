import axios from "axios";

import {
  GET_USER_GAME_ENTRIES,
  GET_OTHER_USER_GAME_ENTRIES,
  GET_USER_GAME_ENTRIES_IDS,
  UPDATE_ACHIEVEMENT_ENTRY,
  GET_AVAILABLE_PLAYERS,
} from "./actionTypes";
import { fetchGames } from "./gameActions";
import { fetchUserStats } from "./userActions";

export const fetchUserGameEntries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/my-library");
      dispatch({ type: GET_USER_GAME_ENTRIES, payload: response.data });
    } catch (error) {
      console.error("Error fetching user game entries", error);
    }
  };
};

export const fetchOtherUserGameEntries = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/my-library/" + id);
      dispatch({ type: GET_OTHER_USER_GAME_ENTRIES, payload: response.data });
    } catch (error) {
      console.error("Error fetching user game entries", error);
    }
  };
};

export const fetchUserGameEntriesIds = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/my-library/ids");

      localStorage.setItem("gameEntriesIds", JSON.stringify(response.data));
      dispatch({ type: GET_USER_GAME_ENTRIES_IDS, payload: response.data });
    } catch (error) {
      console.error("Error fetching user game entries ID", error);
    }
  };
};

export const saveGameEntry = (game, method) => {
  return async (dispatch) => {
    try {
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
      });

      await Promise.all([
        dispatch(fetchUserGameEntries()),
        dispatch(fetchUserGameEntriesIds()),
        dispatch(fetchGames()),
        dispatch(fetchUserStats("me")),
      ]);
    } catch (error) {
      console.error("Error saving game entry", error);
    }
  };
};

export const updateAchievementEntry = (id, unlocked) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`/api/achievement-entries/${id}`, { unlocked });

      dispatch({
        type: UPDATE_ACHIEVEMENT_ENTRY,
        payload: response.data,
      });
      await dispatch(fetchUserStats("me"));
    } catch (error) {
      console.error("Error updating achievement entry", error);
    }
  };
};

export const deleteGameEntry = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete("/api/my-library?id=" + id);

      await Promise.all([
        dispatch(fetchUserGameEntries()),
        dispatch(fetchUserGameEntriesIds()),
        dispatch(fetchGames()),
        dispatch(fetchUserStats("me")),
      ]);
    } catch (error) {
      console.error("Error deleting game entry", error);
    }
  };
};

export const updateGameEntryAvailability = (gameEntryId, data) => async (dispatch) => {
  try {
    await axios.put(`/api/availability/${gameEntryId}`, data);
    dispatch(fetchUserGameEntries());
    await dispatch(fetchAvailablePlayers(gameEntryId));
  } catch (error) {
    console.error(error);
  }
};
export const fetchAvailablePlayers =
  (gameId, filters = {}, page = 0, size = 5) =>
  async (dispatch) => {
    const params = { page, size, ...filters };

    const response = await axios.get(`/api/availability/${gameId}/available-players`, { params });

    dispatch({
      type: GET_AVAILABLE_PLAYERS,
      payload: {
        content: response.data.content,
        totalPages: response.data.totalPages,
      },
    });
  };
