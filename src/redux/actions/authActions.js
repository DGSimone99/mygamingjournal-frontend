import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_GAME_ENTRIES,
} from "./actionTypes";

import { fetchCurrentUser, fetchUserMinimal } from "./userActions";
import { fetchUserGameEntries, fetchUserGameEntriesIds } from "./gameEntryActions";
import axios from "axios";

export const loginFetch = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.post(`/api/auth/login`, credentials);
      const { token, username, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, username, roles },
      });

      await dispatch(fetchCurrentUser());
      dispatch(fetchUserMinimal());
      dispatch(fetchUserGameEntriesIds());
      dispatch(fetchUserGameEntries());

      return token;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        error: error.response?.data?.message || "Login failed",
      });
      return null;
    }
  };
};

export const logoutFetch = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      delete axios.defaults.headers.common["Authorization"];

      dispatch({ type: LOGOUT });
      dispatch({ type: CLEAR_GAME_ENTRIES });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
};

export const registerFetch = (formData) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      await axios.post("/api/auth/register", formData);
      dispatch({ type: REGISTER_SUCCESS });
      return true;
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        error: error.response?.data?.message || "Registration failed",
      });
      return false;
    }
  };
};
