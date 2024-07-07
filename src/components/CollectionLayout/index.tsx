import { MediaInterface } from '@/utils/types';
import { Card } from '@/components/Card';
import { Grid } from '@mui/material';
import MovieFilter from '@mui/icons-material/MovieFilter';
import React from 'react';

export const CollectionLayout = ({ title, movies }: { title: string; movies: MediaInterface[] }) => {
    return (
        <div className="px-10 pt-20 bg-[#fff] dark:bg-[#111]">
            <h2 className="text-xl text-white font-semibold mb-2 flex items-center">
                <MovieFilter className="text-[#FF6F61] mr-2" />
                <span className='text-[#FF6F61]'>{title}</span>
            </h2>
            <Grid container spacing={2}>
                {movies?.map((movie: any) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={3}>
                        <Card item={movie} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
