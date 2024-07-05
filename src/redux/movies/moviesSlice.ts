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

export const searchMediaByName = createAsyncThunk(
    'media/searchMediaByName',
    async (query: string) => {
        const response = await axiosInstance.get('/search/movie', {
            params: { query },
        });
        return response.data.results;
    },
);

export const getMoviesByGenre = createAsyncThunk(
    'media/getMoviesByGenre',
    async (genre: number) => {
        const response = await axiosInstance.get('/discover/movie', {
            params: { with_genres: genre },
        });
        return response.data.results;
    },
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
            }).addCase(searchMediaByName.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                searchMediaByName.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.list = action.payload;
                    state.error = true;
                    state.message = undefined;
                },
            )
            .addCase(searchMediaByName.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            })
            .addCase(getMoviesByGenre.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getMoviesByGenre.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.list = action.payload;
                    state.error = true;
                    state.message = undefined;
                },
            )
            .addCase(getMoviesByGenre.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            });
    },
});

export default moviesSlice.reducer;