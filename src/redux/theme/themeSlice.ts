import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '@/utils/types';

const getInitialDarkMode = (): boolean => {
    if (typeof window !== 'undefined') {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
};

const initialState: ThemeState = {
    darkMode: getInitialDarkMode(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
        },
    },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
