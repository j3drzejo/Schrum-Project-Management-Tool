import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { authService } from '../../services/authService';
import Cookies from 'js-cookie';

export default function SidebarFooter() {
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      Cookies.remove('token');
      window.location.href = '/login';
    }
  };

  return (
    <>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,
              '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' },
              my: 0.5,
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
              my: 0.5,
            }}
            onClick={handleLogout}
          >
            <Logout sx={{ mr: 1.5, color: '#F4A7B9' }} />
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ color: '#333', fontSize: '0.9rem' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
