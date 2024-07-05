'use client';
import { useEffect } from 'react';
import { useMediaActions } from '@/hooks/useMediaActions';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { MediaInterface } from '@/utils/types';
import { useParams } from 'next/navigation';
import { MovieFilter } from '@mui/icons-material';
import { Card } from '@/components/Card';
import { Grid } from '@mui/material';

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
            <div className="px-10 mt-20">
                <h2 className="text-xl text-white font-semibold mb-2">
                    <MovieFilter className="text-[#127bd5] mr-2" />
                    Results
                </h2>
                <Grid container spacing={2}>
                    {movies.map((movie: MediaInterface) => (
                        <Grid item key={movie.id} xs={12} sm={6} md={3}>
                            <Card item={movie} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    ) : (
        <div className="flex flex-col justify-center items-center h-screen">
            <p className="text-white text-2xl">{`No Results found :(`}</p>
        </div>
    );
}