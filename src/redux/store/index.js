import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../reducers/gamesReducer.js";
import gameDetailsReducer from "../reducers/gameDetailsReducer.js";
import loginReducer from "../reducers/loginReducer.js";
import gameEntriesReducer from "../reducers/gameEntriesReducer.js";
import gameEntryIdsReducer from "../reducers/gameEntryIdsReducer.js";

const mainReducer = combineReducers({
  games: gamesReducer,
  game: gameDetailsReducer,
  gameEntries: gameEntriesReducer,
  gameEntryIds: gameEntryIdsReducer,
  login: loginReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
