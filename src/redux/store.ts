import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import moviesSlice from "./movies/moviesSlice";
import genresSlice from "./genres/genresSlice";
import themeSlice from "./theme/themeSlice";

const store = configureStore({
    reducer: {
        movies: moviesSlice,
        genres: genresSlice,
        theme: themeSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();