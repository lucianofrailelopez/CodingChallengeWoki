'use client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { TextField } from '@mui/material';

import {
    Search,
} from '@mui/icons-material';

export const Header = () => {
    const router = useRouter();
    const { query } = useParams();

    const handleSearch = (event: any) => {
        event.preventDefault();
        router.push(`/search/${event.target[0].value}`);
    };

    return (
        <header className="fixed top-0 z-10 flex w-full items-center justify-between py-4 px-10 bg-gradient-to-t from-transparent to-[#121b24]">
            <h1 className="text-white text-2xl">MOVIEFLIX</h1>
            <form
                onSubmit={(e: any) => {
                    handleSearch(e);
                }}
            >
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Search"
                    defaultValue={query}
                    type="search"
                    size="small"
                    InputProps={{
                        startAdornment: <Search className="text-white mr-2" />,
                    }}
                    sx={{
                        width: 300,
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