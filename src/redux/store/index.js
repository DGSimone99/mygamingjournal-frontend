import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/userReducers/authReducer.js";
import userReducer from "../reducers/userReducers/userReducer.js";
import allUsersReducer from "../reducers/userReducers/allUsersReducer.js";
import otherUserReducer from "../reducers/userReducers/otherUserReducer.js";
import friendsReducer from "../reducers/userReducers/friendsReducer.js";
import availablePlayersReducer from "../reducers/userReducers/availablePlayersReducer.js";

import gameDetailsReducer from "../reducers/gameReducers/gameDetailsReducer.js";
import gamesReducer from "../reducers/gameReducers/gamesReducer.js";
import gameEntriesReducer from "../reducers/gameEntryReducers/gameEntriesReducer.js";
import otherUserGameEntriesReducer from "../reducers/gameEntryReducers/userGameEntriesReducer.js";
import gameEntryIdsReducer from "../reducers/gameEntryReducers/gameEntryIdsReducer.js";
import reviewsReducer from "../reducers/gameReducers/reviewsReducer.js";

const mainReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: allUsersReducer,
  otherUser: otherUserReducer,
  friends: friendsReducer,
  availablePlayers: availablePlayersReducer,

  game: gameDetailsReducer,
  games: gamesReducer,
  gameEntries: gameEntriesReducer,
  userGameEntries: otherUserGameEntriesReducer,
  gameEntryIds: gameEntryIdsReducer,
  reviews: reviewsReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
