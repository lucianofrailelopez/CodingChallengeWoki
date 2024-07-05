'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMoviesActions } from '@/hooks/useMoviesActions';
import { CollectionLayout } from '@/components/CollectionLayout';

export default function Home() {
  const { getMedia } = useMoviesActions();

  const movies = useSelector((state: RootState) => state.movies.list);

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <main>
      <CollectionLayout title={`Trending`} movies={movies} />
    </main>
  );
}
