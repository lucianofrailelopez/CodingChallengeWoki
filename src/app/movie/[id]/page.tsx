'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMoviesActions } from '@/hooks/useMoviesActions';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { Rating } from '@/components/Rating';
import { CollectionLayout } from '@/components/CollectionLayout';
import Image from 'next/image';

export default function Movie() {
    const { id } = useParams();
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE;
    const { getMovieById, getSimilarMoviesById } = useMoviesActions();
    const movies = useSelector((state: RootState) => state.movies.list);
    const similarMovies = useSelector(
        (state: RootState) => state.movies.similarMoviesList,
    );

    const srcUrl = movies[0]?.poster_path ? `${imageBaseUrl}${movies[0].poster_path}` : `/assets/default-movie.png`;


    useEffect(() => {
        if (id) {
            getMovieById(id);
            getSimilarMoviesById(id);
        }
    }, []);

    return (
        <div className="px-10 pt-20">
            <div className="flex flex-col md:flex-row md:gap-8">
                <Image
                    src={srcUrl}
                    alt="poster"
                    className="mb-4 md:mb-0 self-center"
                    width={300}
                    height={400}
                    priority
                />
                <div>
                    <div className="flex">
                        <h2 className="text-3xl font-semibold text-white">
                            {movies[0]?.title}
                            {movies[0]?.release_date && (
                                <span className="text-[#ccc] text-3xl ml-2">
                                    {'('}
                                    {movies[0]?.release_date?.split('-')[0]}
                                    {')'}
                                </span>
                            )}
                        </h2>
                    </div>
                    {movies[0]?.genres && (
                        <ul className="flex gap-4 text-white mt-1">
                            {movies[0]?.genres.map((genre: any) => (
                                <li key={genre.id} className="text-[#eee] text-sm">
                                    ● {genre.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    {movies[0]?.vote_average > 0 && (
                        <div className="mt-5 flex items-center gap-2">
                            <Rating movieRating={movies[0]?.vote_average} />
                            <span className="text-[#eee] text-sm">
                                {movies[0]?.vote_count} user votes
                            </span>
                        </div>
                    )}
                    <h3 className="text-xl text-white font-semibold mt-5">Overview</h3>
                    <p className="text-[#ccc] mt-2">{movies[0]?.overview}</p>
                </div>
            </div>
            <div>
                {similarMovies.length > 0 ? (<CollectionLayout title='Recommended' movies={similarMovies} />) : (
                    <p className="text-white mt-2 text-sm">{`We don't have enough information to recommend movies based on "${movies[0]?.title}"`}</p>
                )}
            </div>
        </div>
    );
}