import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../reducers/gamesReducer.js";
import detailGameReducer from "../reducers/detailGameReducer.js";
import loginReducer from "../reducers/loginReducer.js";
import gameListReducer from "../reducers/gameListReducer.js";

const mainReducer = combineReducers({
  games: gamesReducer,
  game: detailGameReducer,
  gameEntries: gameListReducer,
  login: loginReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
