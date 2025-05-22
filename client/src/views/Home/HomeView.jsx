import { Box, CircularProgress, Paper } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext/useSidebar';
import { Snackbar, Alert } from '@mui/material';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Task from '../../components/task/Task';
import Board from '../../components/board/Board';

export default function HomeView() {
  const { loading, errorMessage } = useSidebar();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box
        component="main"
        flexGrow={1}
        sx={{
          background:
            'linear-gradient(to bottom right, #ffe4e6, #fbcfe8, #fff)',
          overflowY: 'auto',
          p: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            maxWidth: 1200,
            mx: 'auto',
            boxShadow: '0 8px 24px rgba(244,167,185,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 28px rgba(244,167,185,0.3)',
            },
          }}
        >
          <Board />
        </Paper>
      </Box>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => {}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
