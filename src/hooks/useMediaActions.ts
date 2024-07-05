'use client';
import { useAppDispatch } from '@/redux/store';
import { getMovies, searchMediaByName } from '@/redux/movies/moviesSlice';

export const useMediaActions = () => {
    const dispatch = useAppDispatch();

    const getMedia = () => {
        dispatch(getMovies());
    };

    const handleSearchMediaByName = (query: string) => {
        dispatch(searchMediaByName(query));
    };

    return {
        getMedia,
        handleSearchMediaByName,
    };
};