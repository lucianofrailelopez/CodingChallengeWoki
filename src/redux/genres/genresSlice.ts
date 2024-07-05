import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/services/api/axiosInstance';
import { GenreState } from '../../utils/types';

const initialState: GenreState = {
    list: [],
    loading: false,
    error: false,
    message: null,
};

export const getGenresList = createAsyncThunk(
    'genres/getGenresList',
    async () => {
        const response = await axiosInstance.get(`/genre/movie/list`);

        if (response.data.success === false) {
            throw new Error(response.data.status_message);
        }

        return response.data.genres;
    },
);

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getGenresList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGenresList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.list = action.payload;
                state.error = true;
                state.message = null;
            })
            .addCase(getGenresList.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            });
    },
});

export default genresSlice.reducer;