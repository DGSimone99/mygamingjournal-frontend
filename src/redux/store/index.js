import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../reducers/gamesReducer.js";
import gameDetailsReducer from "../reducers/gameDetailsReducer.js";
import loginReducer from "../reducers/loginReducer.js";
import gameEntriesReducer from "../reducers/gameEntriesReducer.js";
import gameEntryIdsReducer from "../reducers/gameEntryIdsReducer.js";
import userReducer from "../reducers/userReducer.js";
import reviewsReducer from "../reducers/reviewsReducer.js";
import otherUserReducer from "../reducers/otherUser.js";
import userStatsReducer from "../reducers/userStatsReducer.js";
import userGameEntriesReducer from "../reducers/userGameEntriesReducer.js";
import availablePlayersReducer from "../reducers/availablePlayersReducer.js";

const mainReducer = combineReducers({
  games: gamesReducer,
  game: gameDetailsReducer,
  gameEntries: gameEntriesReducer,
  userGameEntries: userGameEntriesReducer,
  gameEntryIds: gameEntryIdsReducer,
  login: loginReducer,
  user: userReducer,
  otherUser: otherUserReducer,
  userStats: userStatsReducer,
  reviews: reviewsReducer,
  availablePlayers: availablePlayersReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
