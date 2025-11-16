import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ReleaseDetails } from "../Components/types/releaseDetails";

interface DetailsState {
    details: ReleaseDetails | null;
    loading: boolean;
    error: string | null;
}

const initialState: DetailsState = {
    details: null,
    loading: false,
    error: null,
};

export const fetchDetails = createAsyncThunk(
    "details/fetchDetails",
    async (id: string) => {
        const url = `https://musicbrainz.org/ws/2/release/${id}?fmt=json&inc=recordings+artists+labels`;
        const res = await axios.get(url);
        return res.data;
    }
);

const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {
        clearDetails: (state) => {
            state.details = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
            })
            .addCase(fetchDetails.rejected, (state) => {
                state.loading = false;
                state.error = "Error cargando detalles";
            });
    },
});

export const { clearDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
