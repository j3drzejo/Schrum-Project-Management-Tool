import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

export default function SprintDialog({
  open,
  onClose,
  sprintName,
  setSprintName,
  sprintStartDate,
  setSprintStartDate,
  sprintEndDate,
  setSprintEndDate,
  onCreateSprint,
  loading,
}) {
  const isFormValid = sprintName.trim() && sprintStartDate && sprintEndDate;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
        Create New Sprint
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Sprint Name"
          value={sprintName}
          onChange={(e) => setSprintName(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={sprintStartDate}
          onChange={(e) => setSprintStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={sprintEndDate}
          onChange={(e) => setSprintEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onCreateSprint}
          disabled={loading || !isFormValid}
          sx={{
            backgroundColor: '#F4A7B9',
            '&:hover': { backgroundColor: '#ec8ca1' },
          }}
        >
          {loading ? 'Creating...' : 'Create Sprint'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
