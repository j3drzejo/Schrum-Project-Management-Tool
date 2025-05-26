import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingOverlay({ message }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          p: 3,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <CircularProgress size={24} sx={{ color: '#F4A7B9' }} />
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
}
