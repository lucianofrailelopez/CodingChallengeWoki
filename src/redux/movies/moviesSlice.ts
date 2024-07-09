import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MoviesState } from '@/utils/types';
import { addAttributes } from '@/utils/helpers';
import axiosInstance from '@/services/api/axiosInstance';

const initialState: MoviesState = {
    list: [],
    similarMoviesList: [],
    favoriteMovieList: [],
    reccomendedMoviesList: [],
    trailerKey: undefined,
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

export const getMoviesById = createAsyncThunk('movies/fetchMoviesById', async (movieId: string | string[]) => {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
});


export const getSimilarMovies = createAsyncThunk(
    'movies/getSimilarMovies',
    async (param: string | string[]) => {
        const response = await axiosInstance.get(`/movie/${param}/similar`);

        const data = addAttributes(response.data.results).slice(0, 6);
        return data;
    },
);

export const getFavoriteMoviesList = createAsyncThunk(
    'movies/getFavoriteMoviesList', async () => {
        const userId = localStorage.getItem('tokenUser');
        const response = await axiosInstance.get(`/account/${userId}/favorite/movies`, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_AUTH}`,
            }
        });

        return response.data.results;
    }
)

export const addFavoriteMovie = createAsyncThunk(
    'movies/addFavoriteMovie', async ({ movieId, isFavorite }: { movieId: number, isFavorite: boolean }) => {
        console.log(movieId, isFavorite);

        const userId = localStorage.getItem('tokenUser');
        const response = await axiosInstance.post(`/account/${userId}/favorite`, {
            media_type: "movie",
            media_id: movieId,
            favorite: isFavorite
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_AUTH}`,
            },
        });
        return response.data;
    }
)

export const getRecommendationsMovies = createAsyncThunk(
    'movies/getRecommendationsMovies',
    async (param: number) => {
        const response = await axiosInstance.get(`/movie/${param}/recommendations`);
        const data = addAttributes(response.data.results).slice(0, 6);
        return data;
    }
)

export const searchMediaByName = createAsyncThunk(
    'movies/searchMediaByName',
    async (query: string) => {
        const response = await axiosInstance.get('/search/movie', {
            params: { query },
        });
        return response.data.results;
    },
);

export const getMoviesByGenre = createAsyncThunk(
    'movies/getMoviesByGenre',
    async (genre: number) => {
        const response = await axiosInstance.get('/discover/movie', {
            params: { with_genres: genre },
        });
        return response.data.results;
    },
);

export const getMoviesVideoById = createAsyncThunk(
    'movies/getMoviesById',
    async (id: string | string[]) => {
        const response = await axiosInstance.get(`/movie/${id}/videos`);
        const trailer = response.data.results.find(
            (item: any) => item.type === "Trailer"
        );
        return trailer?.key;
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
            })
            .addCase(getMoviesById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMoviesById.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.list = [action.payload];
                state.error = true;
                state.message = undefined;
            })
            .addCase(getMoviesById.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            })
            .addCase(getSimilarMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSimilarMovies.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.similarMoviesList = action.payload;
                    state.error = true;
                    state.message = undefined;
                },
            )
            .addCase(getSimilarMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            })
            .addCase(getFavoriteMoviesList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFavoriteMoviesList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.favoriteMovieList = action.payload;
                state.error = false
            })
            .addCase(getFavoriteMoviesList.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            })
            .addCase(addFavoriteMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(addFavoriteMovie.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = false
            })
            .addCase(addFavoriteMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            })
            .addCase(searchMediaByName.pending, (state) => {
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
            })
            .addCase(getMoviesVideoById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMoviesVideoById.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.trailerKey = action.payload;
                state.error = true;
                state.message = undefined;
            })
            .addCase(getMoviesVideoById.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            })
            .addCase(getRecommendationsMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecommendationsMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.reccomendedMoviesList = action.payload;
                state.error = true;
                state.message = undefined;
            })
            .addCase(getRecommendationsMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.error.message || 'Something went wrong';
            });
    },
});

export default moviesSlice.reducer;