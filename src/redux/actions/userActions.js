import axios from "axios";
import { GET_USER, GET_USER_STATS } from "./actionTypes";

export const fetchCurrentUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/users/me");
      dispatch({ type: GET_USER, payload: response.data });
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/users/" + id);
      dispatch({ type: GET_USER, payload: response.data });
      await dispatch(fetchUserStats(id));
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
};

export const fetchUserStats = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/users/" + id + "/stats");
      dispatch({ type: GET_USER_STATS, payload: response.data });
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
};
