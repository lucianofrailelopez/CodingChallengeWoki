'use client';
import { useAppDispatch } from '@/redux/store';
import { getMovies, getMoviesById, searchMediaByName, getMoviesByGenre, getSimilarMovies, getMoviesVideoById, getFavoriteMoviesList, addFavoriteMovie, getRecommendationsMovies } from '@/redux/movies/moviesSlice';
import { getGenresList } from '@/redux/genres/genresSlice';
import { toggleDarkMode } from '@/redux/theme/themeSlice';

export const useMoviesActions = () => {
    const dispatch = useAppDispatch();

    const getMedia = () => {
        dispatch(getMovies());
    };

    const handleSearchMediaByName = (query: string) => {
        dispatch(searchMediaByName(query));
    };

    const getMovieById = (id: string | string[]) => {
        dispatch(getMoviesById(id));
    };

    const getSimilarMoviesById = (id: string | string[]) => {
        dispatch(getSimilarMovies(id));
    };

    const getGenres = () => {
        dispatch(getGenresList());
    };

    const filterByGenreMovie = (genre: number) => {
        dispatch(getMoviesByGenre(genre));
    };

    const toggleTheme = () => {
        dispatch(toggleDarkMode());
    };

    const getVideoKey = (id: string | string[]) => {
        dispatch(getMoviesVideoById(id));
    };

    const getFavorites = () => {
        dispatch(getFavoriteMoviesList());
    };

    const addMovie = ({ movieId, isFavorite }: { movieId: number, isFavorite: boolean }) => {
        dispatch(addFavoriteMovie({ movieId, isFavorite }));
    }

    const getRecommendations = (movieId: number) => {
        dispatch(getRecommendationsMovies(movieId));
    }

    return {
        getMedia,
        handleSearchMediaByName,
        getMovieById,
        getGenres,
        filterByGenreMovie,
        getSimilarMoviesById,
        toggleTheme,
        getVideoKey,
        getFavorites,
        addMovie,
        getRecommendations
    };
};