import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { ExpandMore, GroupAdd } from '@mui/icons-material';

export default function TeamSelector({
  currentTeam,
  teams,
  handleTeamSelect,
  openCreateTeamDialog,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const teamSelectorOpen = Boolean(anchorEl);

  const handleTeamClick = (e) => setAnchorEl(e.currentTarget);
  const handleTeamClose = () => setAnchorEl(null);

  const handleTeamSelection = (team) => {
    handleTeamSelect(team);
    handleTeamClose();
  };

  const handleCreateTeam = () => {
    handleTeamClose();
    openCreateTeamDialog();
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        p={1.5}
        sx={{
          borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,0.5)',
          boxShadow: '0 2px 6px rgba(244,167,185,0.2)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(244,167,185,0.3)',
          },
          cursor: 'pointer',
        }}
        onClick={handleTeamClick}
      >
        <Typography
          variant="body1"
          sx={{ flexGrow: 1, color: '#333', fontWeight: 'medium' }}
        >
          {currentTeam?.name}
        </Typography>
        <IconButton size="small" sx={{ color: '#F4A7B9', p: 0 }}>
          <ExpandMore />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={teamSelectorOpen}
        onClose={handleTeamClose}
      >
        {teams.map((t) => (
          <MenuItem
            key={t.id}
            onClick={() => handleTeamSelection(t)}
            sx={{
              color: t.id === currentTeam?.id ? '#F4A7B9' : '#333',
              fontWeight: t.id === currentTeam?.id ? 'bold' : 'normal',
              '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' },
            }}
          >
            {t.name}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={handleCreateTeam}
          sx={{ color: '#F4A7B9', fontWeight: 'bold' }}
        >
          <GroupAdd sx={{ fontSize: 18, mr: 1 }} />+ Create New Team
        </MenuItem>
      </Menu>
    </>
  );
}
