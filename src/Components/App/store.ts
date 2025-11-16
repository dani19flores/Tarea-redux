import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "../../state/librarySlice";
import searchReducer from "../../state/searchSlice";
import detailsReducer from "../../state/detailsSlice";

export const store = configureStore({
    reducer: {
        songs: songsReducer,
        search: searchReducer,
        details: detailsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;