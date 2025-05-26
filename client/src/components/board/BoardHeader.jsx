import { Box, Typography, Button, CircularProgress } from '@mui/material';

export default function BoardHeader({
  board,
  currentSprint,
  tasks,
  onEndSprint,
  endSprintLoading,
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}
          >
            {board?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Sprint: {currentSprint.name} • {tasks.length} tasks
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="large"
          onClick={onEndSprint}
          disabled={endSprintLoading}
          sx={{
            borderColor: '#F4A7B9',
            color: '#F4A7B9',
            px: 3,
            py: 1,
            borderRadius: 2,
            fontWeight: 'bold',
            minWidth: 140,
            '&:hover': {
              borderColor: '#ec8ca1',
              backgroundColor: 'rgba(244,167,185,0.05)',
            },
            '&:disabled': {
              borderColor: 'rgba(244,167,185,0.3)',
              color: 'rgba(244,167,185,0.3)',
            },
          }}
        >
          {endSprintLoading ? (
            <>
              <CircularProgress size={16} sx={{ color: '#F4A7B9', mr: 1 }} />
              Ending...
            </>
          ) : (
            'End Sprint'
          )}
        </Button>
      </Box>
    </Box>
  );
}
