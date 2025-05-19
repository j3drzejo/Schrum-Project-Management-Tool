import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

export default function CreateTeamDialog({
  open,
  onClose,
  teamName,
  setTeamName,
  handleSubmit,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
        Create New Team
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
