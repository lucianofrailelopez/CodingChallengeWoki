import { MediaInterface } from '@/utils/types';
import { Card } from '@/components/Card';
import { Grid } from '@mui/material';
import MovieFilter from '@mui/icons-material/MovieFilter';
import React from 'react';

export const CollectionLayout = ({ title, movies }: { title: string; movies: MediaInterface[] }) => {
    return (
        <div className="px-10 mt-20">
            <h2 className="text-xl text-white font-semibold mb-2 flex items-center">
                <MovieFilter className="text-[#127bd5] mr-2" />
                {title}
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
