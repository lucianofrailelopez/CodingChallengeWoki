'use client';
import { useAppDispatch } from '@/redux/store';
import { getMovies } from '@/redux/movies/moviesSlice';

export const useMediaActions = () => {
    const dispatch = useAppDispatch();

    const getMedia = () => {
        dispatch(getMovies());
    };

    return {
        getMedia,
    };
};