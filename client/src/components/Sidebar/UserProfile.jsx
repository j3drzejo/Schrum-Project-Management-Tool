import { Box, Avatar, Typography, IconButton, Tooltip } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

export default function UserProfile({ user, openInvite }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      mb={3}
      sx={{
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-2px)' },
      }}
    >
      <Avatar
        sx={{
          width: 48,
          height: 48,
          mr: 2,
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#fff',
          background: 'linear-gradient(45deg, #F4A7B9, #ec8ca1)',
          boxShadow: '0 4px 12px rgba(244,167,185,0.4)',
        }}
      >
        {user?.email?.charAt(0)}
      </Avatar>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          color: '#F4A7B9',
          flexGrow: 1,
          textShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        {user?.email?.split('@')[0]}
      </Typography>
      <Tooltip title="Invite user">
        <IconButton
          onClick={openInvite}
          sx={{
            color: '#F4A7B9',
            '&:hover': {
              backgroundColor: 'rgba(244,167,185,0.1)',
              transform: 'scale(1.1)',
            },
            transition: 'transform 0.2s',
          }}
        >
          <PersonAdd />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
