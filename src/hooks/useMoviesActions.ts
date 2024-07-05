'use client';
import { useAppDispatch } from '@/redux/store';
import { getMovies, searchMediaByName, getMoviesByGenre } from '@/redux/movies/moviesSlice';

export const useMoviesActions = () => {
    const dispatch = useAppDispatch();

    const getMedia = () => {
        dispatch(getMovies());
    };

    const handleSearchMediaByName = (query: string) => {
        dispatch(searchMediaByName(query));
    };

    const filterByGenreMovie = (genre: number) => {
        dispatch(getMoviesByGenre(genre));
    };

    return {
        getMedia,
        handleSearchMediaByName,
        filterByGenreMovie,
    };
};