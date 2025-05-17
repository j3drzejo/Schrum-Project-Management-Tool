import { useState } from 'react';
import {
  Box, Avatar, Typography, IconButton, Menu, MenuItem,
  List, ListItem, ListItemButton, ListItemText, Divider,
  Button, TextField, Dialog, DialogTitle, DialogContent,
  ListItemAvatar, CircularProgress, Paper, Tooltip
} from '@mui/material';
import { Settings, Logout, ExpandMore, PersonAdd, Search, Dashboard } from '@mui/icons-material';
import { useSidebar } from '../../contexts/SidebarContext';

export default function Sidebar() {
  const {
    user, teams, currentTeam, projects, loading, changeTeam,
    inviteOpen, openInvite, closeInvite, userQuery,
    userResults, inviteLoading, searchUsers, inviteUser,
    setActiveProject, activeProject
  } = useSidebar();

  const [anchorEl, setAnchorEl] = useState(null);
  const teamSelectorOpen = Boolean(anchorEl);

  const handleTeamClick = e => setAnchorEl(e.currentTarget);
  const handleTeamClose = () => setAnchorEl(null);
  const handleTeamSelect = team => { changeTeam(team); handleTeamClose(); };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%" 
        p={2}
      >
        <CircularProgress size={24} sx={{ color: '#F4A7B9' }} />
      </Box>
    );
  }

  return (
    <Paper
      elevation={6}
      sx={{
        width: 280,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(to bottom, #ffe4e6, rgba(255,255,255,0.9))',
        borderRight: '1px solid rgba(244,167,185,0.5)',
        borderRadius: 0,
        backdropFilter: 'blur(8px)',
        boxShadow: '4px 0 12px rgba(0,0,0,0.05)',
        p: 2,
        overflow: 'hidden'
      }}
    >
      <Box>
        {/* User & Invite */}
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
              boxShadow: '0 4px 12px rgba(244,167,185,0.4)'
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{
              color: '#F4A7B9', 
              flexGrow: 1,
              textShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            {user.name}
          </Typography>
          <Tooltip title="Invite user">
            <IconButton 
              onClick={openInvite} 
              sx={{
                color: '#F4A7B9',
                '&:hover': { 
                  backgroundColor: 'rgba(244,167,185,0.1)',
                  transform: 'scale(1.1)'
                },
                transition: 'transform 0.2s'
              }}
            >
              <PersonAdd />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Invite Dialog */}
        <Dialog open={inviteOpen} onClose={closeInvite} fullWidth>
          <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
            Add user to {currentTeam.name}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              placeholder="Search users by name..."
              value={userQuery}
              onChange={e => searchUsers(e.target.value)}
              InputProps={{ 
                startAdornment: <Search sx={{ mr: 1, color: '#F4A7B9' }} /> 
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#F4A7B9' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#F4A7B9' },
              }}
            />
            {inviteLoading && (
              <Box textAlign="center" my={2}>
                <CircularProgress size={24} sx={{ color: '#F4A7B9' }} />
              </Box>
            )}
            <List>
              {userResults.map(u => (
                <ListItem key={u.id} disablePadding>
                  <ListItemButton 
                    onClick={() => inviteUser(u.id)}
                    sx={{
                      borderRadius: 2,
                      '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{
                        background: 'linear-gradient(45deg, #F4A7B9, #ec8ca1)',
                        color: '#fff'
                      }}>
                        {u.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={u.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        {/* Team selector */}
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
            cursor: 'pointer'
          }}
          onClick={handleTeamClick}
        >
          <Typography 
            variant="body1" 
            sx={{
              flexGrow: 1,
              color: '#333',
              fontWeight: 'medium'
            }}
          >
            {currentTeam.name}
          </Typography>
          <IconButton 
            size="small"
            sx={{ color: '#F4A7B9', p: 0 }}
          >
            <ExpandMore />
          </IconButton>
        </Box>
        
        <Menu 
          anchorEl={anchorEl} 
          open={teamSelectorOpen} 
          onClose={handleTeamClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} 
          transformOrigin={{ vertical: 'top', horizontal: 'left' }} 
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }
          }}
        >
          {teams.map(t => (
            <MenuItem 
              key={t.id} 
              onClick={() => handleTeamSelect(t)}
              sx={{
                color: t.id === currentTeam?.id ? '#F4A7B9' : '#333',
                fontWeight: t.id === currentTeam?.id ? 'bold' : 'normal',
                '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' }
              }}
            >
              {t.name}
            </MenuItem>
          ))}
        </Menu>
        
        <Divider sx={{ mb: 2, borderColor: 'rgba(244,167,185,0.3)' }} />
        
        <Typography 
          variant="overline" 
          sx={{ 
            color: '#999', 
            fontSize: '0.75rem', 
            ml: 1, 
            mb: 1,
            display: 'block' 
          }}
        >
          PROJECTS
        </Typography>
        
        <List 
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            mr: -2,
            pr: 1,
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(244,167,185,0.3)',
              borderRadius: '2px',
            },
          }}
        >
          {projects.map((proj, i) => {
            const isNewProject = proj === "+ New Project";
            const isActive = activeProject === proj;
            
            return (
              <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton 
                  onClick={() => !isNewProject && setActiveProject(proj)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: isActive ? 'rgba(244,167,185,0.2)' : 'transparent',
                    '&:hover': { 
                      backgroundColor: isActive 
                        ? 'rgba(244,167,185,0.3)' 
                        : 'rgba(244,167,185,0.1)'
                    },
                    pl: 2
                  }}
                >
                  {!isNewProject && (
                    <Dashboard 
                      sx={{ 
                        mr: 1.5, 
                        fontSize: '1.2rem',
                        color: isActive ? '#F4A7B9' : 'rgba(0,0,0,0.4)'
                      }} 
                    />
                  )}
                  <ListItemText 
                    primary={proj} 
                    primaryTypographyProps={{
                      color: isNewProject ? '#F4A7B9' : isActive ? '#F4A7B9' : '#333',
                      fontWeight: isNewProject || isActive ? 'bold' : 'normal',
                      fontSize: '0.9rem'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Settings/Logout */}
      <Box>
        <Divider sx={{ borderColor: 'rgba(244,167,185,0.3)' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              sx={{
                borderRadius: 2,
                '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' },
                my: 0.5
              }}
            >
              <Settings sx={{ mr: 1.5, color: '#F4A7B9' }} />
              <ListItemText 
                primary="Settings" 
                primaryTypographyProps={{ color: '#333', fontSize: '0.9rem' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton 
              sx={{
                borderRadius: 2,
                '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' },
                my: 0.5
              }}
            >
              <Logout sx={{ mr: 1.5, color: '#F4A7B9' }} />
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ color: '#333', fontSize: '0.9rem' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
}