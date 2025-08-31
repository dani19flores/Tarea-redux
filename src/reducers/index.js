import { combineReducers } from "redux";
import songsReducer from "./songs";

const rootReducer = combineReducers({
    songs: songsReducer,
})

export default rootReducer;