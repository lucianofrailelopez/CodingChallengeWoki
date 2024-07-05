import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesState } from '@/utils/types';
import axiosInstance from '@/services/api/axiosInstance';

const initialState: MoviesState = {
    list: [],
    loading: false,
    error: false,
    message: '',
};

export const getMovies = createAsyncThunk(
    'movies/getMovies',
    async () => {

        const response = await axiosInstance.get(`/trending/movie/day?language=en-US`);

        if (response.data.success === false) {
            throw new Error(response.data.status_message);
        }

        return response.data;
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = false;
                state.list = action.payload.results;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message;
            });
    },
});

export default moviesSlice.reducer;