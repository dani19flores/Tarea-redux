import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Release } from "../Components/types";

interface SearchState {
    artist: string;
    releases: Release[];
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    artist: "",
    releases: [],
    loading: false,
    error: null,
};

export const fetchReleases = createAsyncThunk(
    "search/fetchReleases",
    async (artist: string) => {
        if (!artist) return [];
        const url = `https://musicbrainz.org/ws/2/release/?query=artist:${artist}&fmt=json`;

        const res = await axios.get(url);
        return res.data.releases ?? [];
    }
);

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setArtist: (state, action) => {
            state.artist = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReleases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReleases.fulfilled, (state, action) => {
                state.loading = false;
                state.releases = action.payload;
            })
            .addCase(fetchReleases.rejected, (state) => {
                state.loading = false;
                state.error = "Error al cargar los datos";
            });
    },
});

export const { setArtist } = searchSlice.actions;
export default searchSlice.reducer;
