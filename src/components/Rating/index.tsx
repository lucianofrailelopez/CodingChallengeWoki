import { Box, CircularProgress } from '@mui/material';

export const Rating = ({ movieRating }: any) => {
    return (
        <Box
            sx={{
                position: 'relative',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '50%',
                display: 'inline-flex',
            }}
        >
            <CircularProgress
                variant="determinate"
                value={Math.round(movieRating * 10)}
                sx={{ color: '#FF6F61' }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <span className="text-xs text-black">{`${Math.round(movieRating * 10)}%`}</span>
            </Box>
        </Box>
    );
};