import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

export default function AddProjectDialog({
  open,
  onClose,
  projectName,
  setProjectName,
  handleSubmit,
  teamName,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
        Add Project to {teamName}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#F4A7B9' }}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
