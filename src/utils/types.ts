export interface GenreInterface {
    id?: number | undefined;
    name?: string;
}

export interface GenreState {
    list: GenreInterface[];
    loading: boolean;
    error: boolean;
    message: string | null;
}

export interface MediaInterface {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genres?: GenreInterface[];
}

export interface MoviesState {
    list: MediaInterface[];
    similarMoviesList: MediaInterface[];
    trailerKey: string | undefined;
    loading: boolean;
    error: boolean;
    message: string | undefined;
}

export interface ThemeState {
    darkMode: boolean;
}