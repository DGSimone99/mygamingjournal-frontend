import axios from "axios";

import { LOGIN, LOGOUT, CLEAR_GAME_ENTRIES } from "./actionTypes";
import { fetchCurrentUser, fetchUserStats } from "./userActions";
import { fetchUserGameEntries, fetchUserGameEntriesIds } from "./entryGameActions";

export const loginFetch = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/auth/login`, credentials);
      const { token, username, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch({
        type: LOGIN,
        payload: { token, username, roles },
      });

      await dispatch(fetchCurrentUser());

      dispatch(fetchUserStats("me"));
      dispatch(fetchUserGameEntriesIds());
      dispatch(fetchUserGameEntries());

      return token;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  };
};

export const logoutFetch = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("gameEntries");
      delete axios.defaults.headers.common["Authorization"];

      dispatch({ type: LOGOUT });
      dispatch({ type: CLEAR_GAME_ENTRIES });
    } catch (error) {
      console.log(error);
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
