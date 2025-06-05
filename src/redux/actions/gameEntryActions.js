import axios from "axios";
import {
  GET_USER_GAME_ENTRIES,
  GET_USER_GAME_ENTRIES_IDS,
  UPDATE_ACHIEVEMENT_ENTRY,
  GET_AVAILABLE_PLAYERS_REQUEST,
  GET_AVAILABLE_PLAYERS_SUCCESS,
  GET_AVAILABLE_PLAYERS_FAILURE,
  GET_OTHER_USER_GAME_ENTRIES_REQUEST,
  GET_OTHER_USER_GAME_ENTRIES_SUCCESS,
  GET_OTHER_USER_GAME_ENTRIES_FAILURE,
} from "./actionTypes";
import { fetchGames } from "./gameActions";

export const fetchUserGameEntries = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/my-library");
    dispatch({ type: GET_USER_GAME_ENTRIES, payload: response.data });
  } catch (error) {
    console.error("Error fetching user game entries", error);
  }
};

export const fetchUserGameEntriesIds = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/my-library/ids");
    localStorage.setItem("gameEntriesIds", JSON.stringify(response.data));
    dispatch({ type: GET_USER_GAME_ENTRIES_IDS, payload: response.data });
  } catch (error) {
    console.error("Error fetching user game entries ID", error);
  }
};

export const fetchOtherUserGameEntries = (userId) => {
  return async (dispatch) => {
    dispatch({ type: GET_OTHER_USER_GAME_ENTRIES_REQUEST });
    try {
      const response = await axios.get(`/api/my-library/user/${userId}`);
      dispatch({ type: GET_OTHER_USER_GAME_ENTRIES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: GET_OTHER_USER_GAME_ENTRIES_FAILURE,
        error: error.response?.data?.message || "Error fetching other user's game entries",
      });
    }
  };
};

export const createGameEntry = (game) => async (dispatch) => {
  try {
    const body = {
      hoursPlayed: game.hoursPlayed,
      personalRating: game.personalRating,
      status: game.status,
      notes: game.notes,
    };

    await axios.post(`/api/my-library?idGame=${game.idGame}`, body);

    await Promise.all([dispatch(fetchUserGameEntries()), dispatch(fetchUserGameEntriesIds()), dispatch(fetchGames())]);
  } catch (error) {
    console.error("Error creating game entry", error);
  }
};

export const updateGameEntry = (gameEntry) => async (dispatch) => {
  try {
    await axios.put(`/api/my-library/${gameEntry.id}`, gameEntry);
    await Promise.all([dispatch(fetchUserGameEntries()), dispatch(fetchUserGameEntriesIds()), dispatch(fetchGames())]);
  } catch (error) {
    console.error("Error updating game entry", error);
  }
};

export const deleteGameEntry = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/my-library/${id}`);
    await Promise.all([dispatch(fetchUserGameEntries()), dispatch(fetchUserGameEntriesIds()), dispatch(fetchGames())]);
  } catch (error) {
    console.error("Error deleting game entry", error);
  }
};

export const updateAchievementEntry = (id, unlocked) => async (dispatch) => {
  try {
    const response = await axios.patch(`/api/achievement-entries/${id}`, { unlocked });
    dispatch({ type: UPDATE_ACHIEVEMENT_ENTRY, payload: response.data });
  } catch (error) {
    console.error("Error updating achievement entry", error);
  }
};

export const updateGameEntryAvailability = (gameEntryId, data) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/availability/${gameEntryId}`, data);
    dispatch(fetchUserGameEntries());
    return response.data;
  } catch (error) {
    console.error("Error updating availability", error);
  }
};

export const fetchAvailablePlayers = (gameId, filters = {}, page = 0, size = 5) => {
  return async (dispatch) => {
    dispatch({ type: GET_AVAILABLE_PLAYERS_REQUEST });

    const params = { page, size, ...filters };

    try {
      const response = await axios.get(`/api/availability/${gameId}/available-players`, {
        params,
      });

      dispatch({
        type: GET_AVAILABLE_PLAYERS_SUCCESS,
        payload: {
          content: response.data.content,
          totalPages: response.data.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_AVAILABLE_PLAYERS_FAILURE,
        error: error.response?.data?.message || "Error fetching available players",
      });
    }
  };
};
