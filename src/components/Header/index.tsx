'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toggleDarkMode } from '@/redux/theme/themeSlice';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Select, TextField, MenuItem, FormControl, InputLabel, Switch, Box } from '@mui/material';
import { useMoviesActions } from '@/hooks/useMoviesActions';
import { GenreInterface } from '@/utils/types';
import { Search, BrightnessHighOutlined, Brightness2Outlined } from '@mui/icons-material';

export const Header = () => {
    const [selectedGenre, setSelectedGenre] = useState<GenreInterface | null>();
    const { getGenres, filterByGenreMovie, toggleTheme } = useMoviesActions();
    const genres = useSelector((state: any) => state.genres.list);
    const theme = useSelector((state: any) => state.theme.darkMode);
    const router = useRouter();
    const { query } = useParams();

    useEffect(() => {
        getGenres();
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleSearch = (event: any) => {
        event.preventDefault();
        router.push(`/search/${event.target[0].value}`);
    };

    return (
        <header className="flex w-full flex-col items-center gap-2 py-4 px-10 bg-[#fff] border-b dark:bg-[#000] md:flex-row md:justify-between">
            <Link className="text-[#FF6F61] text-2xl" href={'/'}>MOVIEFLIX</Link>
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
            <Switch
                checked={theme}
                onChange={() => toggleTheme()}
                inputProps={{ 'aria-label': 'controlled' }}
                icon={<Box sx={{
                    borderRadius: '50%',
                    backgroundColor: '#FF6F61',
                }}>
                    <BrightnessHighOutlined sx={{ margin: '2px' }} />
                </Box>}
                checkedIcon={<Box sx={{
                    borderRadius: '50%',
                    backgroundColor: '#FF6F61',
                }}>
                    <Brightness2Outlined sx={{ margin: '2px', color: 'white' }} />
                </Box>}
                sx={{
                    '& .MuiSwitch-switchBase.Mui-checked ': {
                        color: '#FF6F61',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#FF6F61',
                    },
                }}
            />
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
                        startAdornment: <Search sx={{ color: '#FF6F61', marginRight: 2 }} />,
                    }}
                    sx={{
                        maxWidth: 300,
                        backgroundColor: `${theme ? '#' : '#fff'}`,
                        '& .MuiInputBase-input': {
                            color: '#FF6F61',
                        },
                        '.MuiOutlinedInput-root': {
                            '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
                                borderColor: '#FF6F61',
                            },
                        },

                    }}
                    onChange={(e: any) => {
                        if (e.target.value === '') router.push('/');
                    }}
                />
            </form>
        </header >
    );
};