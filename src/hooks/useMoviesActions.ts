'use client';
import { useAppDispatch } from '@/redux/store';
import { getMovies, getMoviesById, searchMediaByName, getMoviesByGenre, getSimilarMovies } from '@/redux/movies/moviesSlice';

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

    const filterByGenreMovie = (genre: number) => {
        dispatch(getMoviesByGenre(genre));
    };

    return {
        getMedia,
        handleSearchMediaByName,
        getMovieById,
        filterByGenreMovie,
        getSimilarMoviesById,
    };
};