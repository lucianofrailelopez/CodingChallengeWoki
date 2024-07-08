'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMoviesActions } from '@/hooks/useMoviesActions';
import { CollectionLayout } from '@/components/CollectionLayout';
import { CircularProgress } from '@mui/material';

export default function Home() {
  const { getMedia, getFavorites } = useMoviesActions();
  const { list, loading } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    getMedia();
    getFavorites();
  }, []);


  return (
    loading ? (<div className="flex h-screen w-screen items-center justify-center">
      <CircularProgress sx={{ color: 'white' }} />
    </div>) : (<main>
      <CollectionLayout title={`Trending`} movies={list} />
    </main>)
  );
}
