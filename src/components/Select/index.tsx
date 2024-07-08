"use client";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useMoviesActions } from '@/hooks/useMoviesActions'
import { useSelector } from 'react-redux';
import { GenreInterface } from '@/utils/types';
import { useState, useEffect } from 'react';


export const SelectComponent = () => {
    const { getGenres, filterByGenreMovie, toggleTheme } = useMoviesActions();
    const [selectedGenre, setSelectedGenre] = useState<GenreInterface | null>();
    const genres = useSelector((state: any) => state.genres.list);

    useEffect(() => {
        getGenres();
    }, []);
    return (
        <FormControl variant="outlined" fullWidth size='small'
            className='max-w-[300px]'
            sx={{
                '.MuiOutlinedInput-root': {
                    '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
                        borderColor: '#FF6F61',
                    },
                },
                '.MuiSvgIcon-root': {
                    color: '#FF6F61',
                },
            }}>
            <InputLabel id="genre-select-label" sx={{
                color: '#FF6F61', '&.Mui-focused': {
                    color: '#FF6F61',
                },
            }}>
                Genre
            </InputLabel>
            <Select
                labelId="genre-select-label"
                label="Genre"
                id="genre-select"
                value={selectedGenre?.id || ''}
                onChange={(event: any) => {
                    setSelectedGenre(genres.find((genre: GenreInterface) => genre.id === event.target.value));
                    filterByGenreMovie(event.target.value);
                }}
                className='bg-[#fff] dark:bg-[#000000]'
            >
                {genres.map((genre: GenreInterface) => (
                    <MenuItem key={genre.id} value={genre.id} sx={{
                        '&:hover': {
                            backgroundColor: '#FF6F61',
                            color: 'white',
                        },
                    }}>
                        {genre.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}