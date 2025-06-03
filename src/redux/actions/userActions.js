import axios from "axios";
import {
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_FRIENDS_FAILURE,
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_OTHER_USER_FAILURE,
  GET_OTHER_USER_REQUEST,
  GET_OTHER_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_MINIMAL_FAILURE,
  GET_USER_MINIMAL_REQUEST,
  GET_USER_MINIMAL_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SETTINGS_FAILURE,
  GET_USER_SETTINGS_REQUEST,
  GET_USER_SETTINGS_SUCCESS,
  GET_USER_SUCCESS,
} from "./actionTypes";
import { logoutFetch } from "./authActions";

export const fetchCurrentUser = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get("/api/users/me");
      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        error: error.response?.data?.message || "Error fetching user",
      });
    }
  };
};

export const fetchUserMinimal = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_MINIMAL_REQUEST });
    try {
      const response = await axios.get("/api/users/me/minimal");
      dispatch({ type: GET_USER_MINIMAL_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: GET_USER_MINIMAL_FAILURE,
        error: error.response?.data?.message || "Error fetching user minimal",
      });
    }
  };
};

export const fetchUserSettings = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_SETTINGS_REQUEST });
    try {
      const response = await axios.get("/api/users/me/settings");
      dispatch({ type: GET_USER_SETTINGS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: GET_USER_SETTINGS_FAILURE,
        error: error.response?.data?.message || "Error fetching user settings",
      });
    }
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: GET_OTHER_USER_REQUEST });
    try {
      const response = await axios.get(`/api/users/${id}`);
      dispatch({ type: GET_OTHER_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: GET_OTHER_USER_FAILURE,
        error: error.response?.data?.message || "Error fetching user",
      });
    }
  };
};

export const fetchFriends = (page = 0, size = 10, query = "") => {
  return async (dispatch) => {
    dispatch({ type: GET_FRIENDS_REQUEST });
    try {
      const response = await axios.get(`/api/users/me/friends`, {
        params: { page, size, query },
      });

      dispatch({
        type: GET_FRIENDS_SUCCESS,
        payload: {
          content: response.data.content,
          totalPages: response.data.totalPages,
          pageNumber: response.data.number,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_FRIENDS_FAILURE,
        error: error.response?.data?.message || "Error fetching friends",
      });
    }
  };
};

export const fetchAllUsers = (page = 0, size = 10, query = "") => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    try {
      const response = await axios.get("/api/users", {
        params: { page, size, query },
      });
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: {
          content: response.data.content,
          totalPages: response.data.totalPages,
          pageNumber: response.data.number,
        },
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_USERS_FAILURE,
        error: err.response?.data?.message || "Error fetching users",
      });
    }
  };
};

// EDITS
export const fetchDeleteCurrentUser = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/api/users/me");
      await dispatch(logoutFetch());
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };
};
export const updateUserNamesFetch = ({ displayName }) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/users/me/display-name", { displayName });
      await dispatch(fetchCurrentUser());
      await dispatch(fetchUserSettings());
    } catch (error) {
      console.error("Failed to update display name:", error);
    }
  };
};

export const updateUserLanguagesFetch = ({ languages }) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/users/me/languages", { languages });
      await dispatch(fetchCurrentUser());
      await dispatch(fetchUserSettings());
    } catch (error) {
      console.error("Failed to update languages:", error);
    }
  };
};

export const updateUserContactsFetch = (contacts) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/users/me/contacts", contacts);
      await dispatch(fetchCurrentUser());
      await dispatch(fetchUserSettings());
    } catch (error) {
      console.error("Failed to update contacts:", error);
    }
  };
};

export const updateBioFetch = ({ bio }) => {
  return async (dispatch) => {
    try {
      await axios.put("/api/users/me/bio", { bio });
      await dispatch(fetchCurrentUser());
      await dispatch(fetchUserSettings());
    } catch (error) {
      console.error("Failed to update bio:", error);
    }
  };
};

export const changePasswordFetch = (data) => {
  return async () => {
    try {
      await axios.put("/api/users/me/password", data);
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };
};

export const updateUserAvatarFetch = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/api/users/me/avatar", formData);

      await dispatch(fetchUserSettings());
      await dispatch(fetchUserMinimal());
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    }
  };
};

export const toggleFollowFetch = (userId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/users/me/follow/${userId}`);
      await dispatch(fetchCurrentUser());
      await dispatch(fetchFriends(0, 10));
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };
};
