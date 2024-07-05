'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMediaActions } from '@/hooks/useMediaActions';
import { CollectionLayout } from '@/components/CollectionLayout';

export default function Home() {
  const { getMedia } = useMediaActions();

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
