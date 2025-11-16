import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, LOADING, SUCCEEDED } from "./status";
import { Release } from "../Components/types";

interface SongsState {
    status: string;
    songs: Release[];
}

const initialState: SongsState = {
    status: IDLE,
    songs: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const librarySlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        addSong: (state, action: PayloadAction<Release>) => {
            console.log(action.payload)
            if (!state.songs.find(song => song.id === action.payload.id)) {
                state.songs.push(action.payload);
                localStorage.setItem('favorites', JSON.stringify(state.songs));
            }
        },
        removeSong: (state, action: PayloadAction<string>) => {
            state.songs = state.songs.filter((song) => song.id !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.songs));
        },
    },
});

export interface Song {
    id: string;
    title: string;
    completed?: boolean;
}


export const { addSong, removeSong } = librarySlice.actions;
const { reducer: songsReducer } = librarySlice;
export default songsReducer;