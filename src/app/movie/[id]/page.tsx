'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMoviesActions } from '@/hooks/useMoviesActions';
import { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Rating } from '@/components/Rating';
import { CollectionLayout } from '@/components/CollectionLayout';
import { TrailerLayout } from '@/components/TrailerLayout';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Movie() {
    const { id } = useParams();
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE;
    const { getMovieById, getSimilarMoviesById, getVideoKey, addMovie } = useMoviesActions();
    const { list, favoriteMovieList } = useSelector((state: RootState) => state.movies);
    const trailerKey = useSelector((state: RootState) => state.movies.trailerKey);
    const similarMovies = useSelector(
        (state: RootState) => state.movies.similarMoviesList,
    );
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const [isFavoriteMovie, setIsFavoriteMovie] = useState(favoriteMovieList.some((movie: any) => movie.id === list[0]?.id));

    const handleFavoriteClick = ({ movieId, isFavorite }: { movieId: number, isFavorite: boolean }) => {
        if (!isAuthenticated) {
            alert("You need to be logged in to add movies to favorites.");
            return;
        }
        setIsFavoriteMovie(isFavorite);
        addMovie({ movieId, isFavorite });
    };

    const srcUrl = list[0]?.poster_path ? `${imageBaseUrl}${list[0].poster_path}` : `/assets/default-movie.png`;

    useEffect(() => {
        if (id) {
            getMovieById(id);
            getSimilarMoviesById(id);
            getVideoKey(id);
        }
    }, []);

    return (
        <div className="px-10 pt-20 bg-[#fff] dark:bg-[#111]">
            <div className="flex flex-col md:flex-row md:gap-8">
                <Image
                    src={srcUrl}
                    alt="poster"
                    className="mb-4 md:mb-0 self-center "
                    width={300}
                    height={400}
                    priority
                />
                <div>
                    <div className="flex">
                        <h2 className="text-3xl font-semibold text-black dark:text-white">
                            {list[0]?.title}
                            {list[0]?.release_date && (
                                <span className="text-[#ccc] text-3xl ml-2">
                                    {'('}
                                    {list[0]?.release_date?.split('-')[0]}
                                    {')'}
                                </span>
                            )}
                        </h2>

                        {isFavoriteMovie ? (
                            <button
                                onClick={() => handleFavoriteClick({ movieId: list[0]?.id, isFavorite: false })}
                                className={`ml-4 text-2xl ${isAuthenticated ? "cursor-pointer" : "cursor-not-allowed"
                                    }`}
                                disabled={!isAuthenticated}
                            >
                                <FavoriteIcon className="text-orange-500" />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleFavoriteClick({ movieId: list[0]?.id, isFavorite: true })}
                                className={`ml-4 text-2xl ${isAuthenticated ? "cursor-pointer" : "cursor-not-allowed"
                                    }`}
                                disabled={!isAuthenticated}
                            >
                                <FavoriteBorderIcon className="text-gray-500 dark:text-white" />
                            </button>
                        )}
                    </div>
                    {list[0]?.genres && (
                        <ul className="flex gap-4 mt-1">
                            {list[0]?.genres.map((genre: any) => (
                                <li key={genre.id} className="text-[#111] text-sm dark:text-[#eee]">
                                    ● {genre.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    {list[0]?.vote_average > 0 && (
                        <div className="mt-5 flex items-center gap-2">
                            <Rating movieRating={list[0]?.vote_average} />
                            <span className="text-[#111] text-sm dark:text-[#eee]">
                                {list[0]?.vote_count} user votes
                            </span>
                        </div>
                    )}
                    <h3 className="text-xl text-[#111] font-semibold mt-5 dark:text-white">Overview</h3>
                    <p className="text-[#111] mt-2 dark:text-[#eee]">{list[0]?.overview}</p>
                </div>
            </div>
            <div>
                <TrailerLayout trailerKey={trailerKey || ''} />
            </div>
            <div>
                {similarMovies.length > 0 ? (<CollectionLayout title='Recommended' movies={similarMovies} />) : (
                    <p className="text-white mt-2 text-sm">{`We don't have enough information to recommend movies based on "${list[0]?.title}"`}</p>
                )}
            </div>
        </div>
    );
}