'use client';
import { useEffect } from 'react';
import { useMediaActions } from '@/hooks/useMediaActions';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { CollectionLayout } from '@/components/CollectionLayout';

export default function Search() {
    const { handleSearchMediaByName } = useMediaActions();
    const { query } = useParams();
    const movies = useSelector((state: RootState) => state.movies.list);

    useEffect(() => {
        if (query) {
            handleSearchMediaByName(`${query}`);
        }
    }, []);


    return movies?.length > 0 ? (
        <>
            <CollectionLayout title={'Results'} movies={movies} />
        </>
    ) : (
        <div className="flex flex-col justify-center items-center h-screen">
            <p className="text-white text-2xl">{`No Results found :(`}</p>
        </div>
    );
}