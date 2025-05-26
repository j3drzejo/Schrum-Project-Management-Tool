import { useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
} from '@mui/material';
import { SaveAlt } from '@mui/icons-material';

export default function TaskDialog({
  open,
  onClose,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  taskAssigneeId,
  setTaskAssigneeId,
  teamUsers,
  selectedColumnId,
  board,
  onCreateTask,
  loading,
}) {
  const selectedColumn = useMemo(
    () => board?.columns?.find((col) => col.id === selectedColumnId),
    [board, selectedColumnId],
  );

  const isFormValid = taskTitle.trim() && selectedColumnId;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
        Create New Task
        {selectedColumn && (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            in {selectedColumn.name}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Task Title *"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
          error={!taskTitle.trim() && taskTitle.length > 0}
          helperText={
            !taskTitle.trim() && taskTitle.length > 0 ? 'Title is required' : ''
          }
        />

        <TextField
          fullWidth
          label="Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          multiline
          rows={4}
          sx={{ mb: 2 }}
          placeholder="Describe what needs to be done..."
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="assignee-select-label">
            Assign to (Optional)
          </InputLabel>
          <Select
            labelId="assignee-select-label"
            value={taskAssigneeId}
            onChange={(e) => setTaskAssigneeId(e.target.value)}
            label="Assign to (Optional)"
          >
            <MenuItem value="">
              <em>Unassigned</em>
            </MenuItem>
            {teamUsers.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      mr: 1,
                      fontSize: '0.7rem',
                      bgcolor: '#F4A7B9',
                    }}
                  >
                    {user.name?.charAt(0)}
                  </Avatar>
                  {user.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveAlt />}
          onClick={onCreateTask}
          disabled={loading || !isFormValid}
          sx={{
            backgroundColor: '#F4A7B9',
            '&:hover': { backgroundColor: '#ec8ca1' },
          }}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
