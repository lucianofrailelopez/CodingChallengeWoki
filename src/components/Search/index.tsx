"use client";
import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

export const SearchComponent = () => {
    const router = useRouter();
    const { query } = useParams();
    const theme = useSelector((state: any) => state.theme.darkMode);

    const handleSearch = (event: any) => {
        event.preventDefault();
        router.push(`/search/${event.target[0].value}`);
    };
    return (
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
    )

}