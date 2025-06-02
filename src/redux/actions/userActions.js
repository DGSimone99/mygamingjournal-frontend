import axios from "axios";
import { GET_FRIENDS, GET_OTHER_USER, GET_USER, GET_USER_STATS } from "./actionTypes";
import { logoutFetch } from "./authActions";

export const fetchCurrentUser = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_USER, payload: response.data });
      await dispatch(fetchFriends(0, 10));
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
};

export const fetchDeleteCurrentUser = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/api/users/me", {});
      await dispatch(logoutFetch());
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/users/" + id);
      dispatch({ type: GET_OTHER_USER, payload: response.data });
      await dispatch(fetchUserStats(id));
    } catch (error) {
      console.error("Error fetching user", error);
      dispatch(logoutFetch());
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

export const updateUserNamesFetch = ({ displayName }) => {
  return async (dispatch) => {
    await axios.put("/api/users/me/display-name", {
      displayName,
    });

    await dispatch(fetchCurrentUser());
  };
};

export const updateUserLanguagesFetch = ({ languages }) => {
  return async (dispatch) => {
    await axios.put("/api/users/me/languages", { languages });
    await dispatch(fetchCurrentUser());
  };
};

export const updateUserContactsFetch = (contacts) => {
  return async (dispatch) => {
    await axios.put("/api/users/me/contacts", contacts);
    await dispatch(fetchCurrentUser());
  };
};

export const updateBioFetch = ({ bio }) => {
  return async (dispatch) => {
    await axios.put("/api/users/me/bio", {
      bio,
    });

    await dispatch(fetchCurrentUser());
  };
};

export const changePasswordFetch = (data) => {
  return async () => {
    await axios.put("/api/users/me/password", data);
  };
};

export const fetchFriends = (page = 0, size = 10) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/me/friends`, {
        params: { page, size },
      });

      dispatch({
        type: GET_FRIENDS,
        payload: {
          content: response.data.content,
          totalPages: response.data.totalPages,
          pageNumber: response.data.number,
        },
      });
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };
};

export const toggleFollowFetch = (userId) => {
  return async (dispatch) => {
    await axios.put(`/api/users/me/follow/${userId}`);
    await dispatch(fetchCurrentUser());
    await dispatch(fetchFriends(0, 10));
  };
};
