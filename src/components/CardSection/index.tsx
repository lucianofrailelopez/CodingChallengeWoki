'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMoviesActions } from '@/hooks/useMoviesActions';
import { CollectionLayout } from '@/components/CollectionLayout';
import { CircularProgress } from '@mui/material';

export const CardSection = () => {
    const { getMedia, getFavorites, getRecommendations } = useMoviesActions();
    const { list, loading, favoriteMovieList, reccomendedMoviesList } = useSelector((state: RootState) => state.movies);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        getMedia();
        getFavorites();
    }, []);

    useEffect(() => {
        if (favoriteMovieList.length) {
            getRecommendations(favoriteMovieList[0].id);
        }
    }, [favoriteMovieList]);

    return (
        loading ? (<div className="flex h-screen w-screen items-center justify-center bg-[#fff] dark:bg-[#111]">
            <CircularProgress sx={{ color: '#FF6F61' }} />
        </div>) : (<main>
            {isAuthenticated && favoriteMovieList.length ? <CollectionLayout title={`Favorites`} movies={favoriteMovieList} /> : <></>}
            {isAuthenticated && favoriteMovieList.length && reccomendedMoviesList.length ? <CollectionLayout title={`Recommendations`} movies={reccomendedMoviesList} /> : <></>}
            <CollectionLayout title={`Trending`} movies={list} />
        </main>)
    );
}