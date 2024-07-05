'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMediaActions } from '@/hooks/useMediaActions';
import { MediaInterface } from '@/utils/types';
import { MovieFilter } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Card } from '@/components/Card';

export default function Home() {
  const { getMedia } = useMediaActions();

  const movies = useSelector((state: RootState) => state.movies.list);

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <main>
      <div className="px-10 mt-20">
        <h2 className="text-xl text-white font-semibold mb-2">
          <MovieFilter className="text-[#127bd5] mr-2" />
          Trending
        </h2>
        <Grid container spacing={2}>
          {movies.map((movie: MediaInterface) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <Card item={movie} />
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
}
