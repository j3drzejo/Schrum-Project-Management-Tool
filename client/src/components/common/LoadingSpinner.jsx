import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: 'linear-gradient(to bottom right, #ffe4e6, #fbcfe8, #fff)',
      }}
    >
      <CircularProgress size={48} sx={{ color: '#F4A7B9' }} />
    </Box>
  );
};

export default LoadingSpinner;
