import {
  List,
  ListItem,
  ListItemButton,
  Box,
  Avatar,
  Typography,
  Button,
} from '@mui/material';

export default function PendingInvites({ invites, onAccept, onDecline }) {
  if (!invites || invites.length === 0) return null;

  return (
    <List sx={{ mb: 2 }}>
      {invites.map((invite) => (
        <ListItem key={invite.id} disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            sx={{
              borderRadius: 2,
              alignItems: 'flex-start',
              flexDirection: 'column',
              px: 2,
              py: 1.5,
              backgroundColor: 'rgba(255,255,255,0.4)',
              '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' },
            }}
          >
            <Box display="flex" alignItems="center" width="100%" mb={0.5}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: '0.8rem',
                  background: 'linear-gradient(45deg, #ec8ca1, #F4A7B9)',
                  color: '#fff',
                  mr: 1,
                }}
              >
                {invite.invitedBy.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: '0.85rem', color: '#333' }}>
                  {invite.invitedBy.name} invited you
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#999' }}>
                  to {invite.team.name}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1} ml={4}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: '#F4A7B9',
                  borderColor: '#F4A7B9',
                  fontSize: '0.7rem',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' },
                }}
                onClick={() => onAccept(invite.id)}
              >
                Accept
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{
                  color: '#999',
                  fontSize: '0.7rem',
                  textTransform: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={() => onDecline(invite.id)}
              >
                Decline
              </Button>
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
