import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { Dashboard } from '@mui/icons-material';

export default function ProjectsList({
  projects,
  activeProject,
  setActiveProject,
  openAddProjectDialog,
}) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography
          variant="overline"
          sx={{ color: '#999', fontSize: '0.75rem', ml: 1 }}
        >
          PROJECTS
        </Typography>
        <Tooltip title="Add project">
          <IconButton onClick={openAddProjectDialog} sx={{ color: '#F4A7B9' }}>
            <Dashboard />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ flexGrow: 1, overflowY: 'auto', mr: -2, pr: 1 }}>
        {projects.map((proj) => {
          const isActive = activeProject?.id === proj.id;
          return (
            <ListItem key={proj.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => setActiveProject(proj)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive
                    ? 'rgba(244,167,185,0.2)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive
                      ? 'rgba(244,167,185,0.3)'
                      : 'rgba(244,167,185,0.1)',
                  },
                  pl: 2,
                }}
              >
                <ListItemText
                  primary={proj.name}
                  primaryTypographyProps={{
                    color: isActive ? '#F4A7B9' : '#333',
                    fontWeight: isActive ? 'bold' : 'normal',
                    fontSize: '0.9rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
