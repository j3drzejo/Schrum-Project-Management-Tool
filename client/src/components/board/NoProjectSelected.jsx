import { Box, Typography } from '@mui/material';

export default function NoProjectSelected() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="400px"
      p={4}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Please select a project to view the board
      </Typography>
    </Box>
  );
}
