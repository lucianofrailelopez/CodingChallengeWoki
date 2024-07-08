import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import moviesSlice from "./movies/moviesSlice";
import genresSlice from "./genres/genresSlice";
import themeSlice from "./theme/themeSlice";
import authSlice from './auth/authSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('token');
        if (serializedState === null) {
            return undefined;
        }
        return {
            auth: {
                isAuthenticated: true,
                userName: serializedState,
            },
        };
    } catch (err) {
        return undefined;
    }
};

const persistedState = loadState();

const store = configureStore({
    reducer: {
        movies: moviesSlice,
        genres: genresSlice,
        theme: themeSlice,
        auth: authSlice,
    },
    preloadedState: persistedState,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();