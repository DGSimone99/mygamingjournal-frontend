import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../reducers/gamesReducer.js";
import gameDetailsReducer from "../reducers/gameDetailsReducer.js";
import gameEntriesReducer from "../reducers/gameEntriesReducer.js";
import gameEntryIdsReducer from "../reducers/gameEntryIdsReducer.js";
import userReducer from "../reducers/userReducers/userReducer.js";
import reviewsReducer from "../reducers/reviewsReducer.js";
import otherUserReducer from "../reducers/userReducers/otherUserReducer.js";
import userGameEntriesReducer from "../reducers/userGameEntriesReducer.js";
import availablePlayersReducer from "../reducers/userReducers/availablePlayersReducer.js";
import friendsReducer from "../reducers/userReducers/friendsReducer.js";
import allUsersReducer from "../reducers/userReducers/allUsersReducer.js";
import authReducer from "../reducers/userReducers/authReducer.js";

const mainReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: allUsersReducer,
  otherUser: otherUserReducer,
  friends: friendsReducer,
  availablePlayers: availablePlayersReducer,

  game: gameDetailsReducer,
  games: gamesReducer,
  userGameEntries: userGameEntriesReducer,
  gameEntries: gameEntriesReducer,
  gameEntryIds: gameEntryIdsReducer,
  reviews: reviewsReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
