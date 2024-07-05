'use client';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "@/redux/store";
import { getMovies } from "@/redux/movies/moviesSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const movies = useSelector((state: RootState) => state.movies.list);
  useEffect(() => {
    dispatch(getMovies());
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Hello Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </main>
  );
}
