import { Box, Alert } from '@mui/material';

export default function ErrorAlert({ error }) {
  return (
    <Box p={4}>
      <Alert
        severity="error"
        sx={{
          maxWidth: 600,
          mx: 'auto',
          '& .MuiAlert-icon': { color: '#F4A7B9' },
        }}
      >
        {error}
      </Alert>
    </Box>
  );
}
