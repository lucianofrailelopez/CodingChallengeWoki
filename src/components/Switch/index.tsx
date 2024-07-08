"use client";
import { Switch, Box } from '@mui/material';
import { BrightnessHighOutlined, Brightness2Outlined } from '@mui/icons-material';
import { useMoviesActions } from '@/hooks/useMoviesActions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const SwitchComponent = () => {
    const { toggleTheme } = useMoviesActions();
    const theme = useSelector((state: any) => state.theme.darkMode);

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <>
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
        </>
    )
}