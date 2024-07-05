'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Select, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useMoviesActions } from '@/hooks/useMoviesActions';
import { GenreInterface } from '@/utils/types';
import { getGenresList } from '@/redux/genres/genresSlice';
import { Search } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';

export const Header = () => {
    const [selectedGenre, setSelectedGenre] = useState<GenreInterface | null>();
    const { filterByGenreMovie } = useMoviesActions();
    const dispatch = useAppDispatch();
    const genres = useSelector((state: any) => state.genres.list);
    const router = useRouter();
    const { query } = useParams();

    useEffect(() => {
        dispatch(getGenresList());
    }, []);

    const handleSearch = (event: any) => {
        event.preventDefault();
        router.push(`/search/${event.target[0].value}`);
    };

    return (
        <header className="flex w-full flex-col items-center gap-2 py-4 px-10 bg-gradient-to-t to-[#121b24] md:flex-row md:justify-between">
            <h1 className="text-white text-2xl">MOVIEFLIX</h1>
            <FormControl variant="outlined" fullWidth size='small' sx={{
                maxWidth: 300,
                color: 'white',
                backgroundColor: '#000000',
                '.MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                },
                '.MuiSvgIcon-root': {
                    color: 'white',
                },
            }}>
                <InputLabel id="genre-select-label" sx={{
                    color: 'white',
                    '&.Mui-focused': {
                        color: 'white',
                    },
                }}>Genre</InputLabel>
                <Select
                    labelId="genre-select-label"
                    label="Genre"
                    id="genre-select"
                    value={selectedGenre?.id}
                    onChange={(event: any) => {
                        setSelectedGenre(genres.find((genre: GenreInterface) => genre.id === event.target.value));
                        filterByGenreMovie(event.target.value);
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                color: 'white',
                                backgroundColor: '#000000',
                            },
                        },
                    }}
                    sx={{
                        color: 'white',
                        '& .MuiSelect-icon': {
                            color: 'white',
                        },
                    }}
                >
                    {genres.map((genre: GenreInterface) => (
                        <MenuItem key={genre.id} value={genre.id} sx={{
                            '&:hover': {
                                backgroundColor: '#333333',
                                color: 'white',
                            },
                        }}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <form
                onSubmit={(e: any) => {
                    handleSearch(e);
                }}
                className="w-full flex justify-center md:w-auto"
            >
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Search"
                    defaultValue={query}
                    type="search"
                    size="small"
                    fullWidth
                    InputProps={{
                        startAdornment: <Search className="text-white mr-2" />,
                    }}
                    sx={{
                        maxWidth: 300,
                        color: 'white',
                        backgroundColor: '#77777722',
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                    onChange={(e: any) => {
                        if (e.target.value === '') router.push('/');
                    }}
                />
            </form>
        </header>
    );
};