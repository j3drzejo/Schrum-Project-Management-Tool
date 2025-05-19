import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

export default function InviteDialog({
  open,
  onClose,
  inviteEmail,
  setInviteEmail,
  handleInviteSubmit,
  inviteLoading,
  teamName,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
        Invite user to {teamName}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder="Enter user's email address"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        {inviteLoading && (
          <Box textAlign="center" my={2}>
            <CircularProgress size={24} sx={{ color: '#F4A7B9' }} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#F4A7B9' }}
          onClick={handleInviteSubmit}
          disabled={!inviteEmail.trim() || inviteLoading}
        >
          Send Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
}
