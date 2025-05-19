// components/sidebar/Sidebar.jsx
import { useState } from 'react';
import { Box, Paper, CircularProgress } from '@mui/material';
import { useSidebar } from '../../contexts/SidebarContext';
import LoadingSpinner from '../common/LoadingSpinner';
// Import the new components
import UserProfile from './UserProfile';
import InviteDialog from './InviteDialog';
import TeamSelector from './TeamSelector';
import CreateTeamDialog from './CreateTeamDialog';
import PendingInvites from './PendingInvites';
import ProjectsList from './ProjectsList';
import AddProjectDialog from './AddProjectDialog';
import SidebarFooter from './SidebarFooter';

export default function Sidebar() {
  const {
    user,
    teams,
    currentTeam,
    projects,
    loading,
    changeTeam,
    inviteOpen,
    openInvite,
    closeInvite,
    inviteLoading,
    inviteUser,
    setActiveProject,
    activeProject,
    createTeam,
    receivedInvites,
    acceptInvite,
    declineInvite,
    createProject,
  } = useSidebar();

  const [createTeamDialogOpen, setCreateTeamDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const handleTeamSelect = (team) => {
    if (team.id !== currentTeam?.id) {
      changeTeam(team);
    }
  };

  const handleCreateTeamSubmit = () => {
    if (newTeamName.trim()) {
      createTeam(newTeamName);
      setNewTeamName('');
      setCreateTeamDialogOpen(false);
    }
  };

  const handleAddProjectOpen = () => setAddProjectDialogOpen(true);
  const handleAddProjectClose = () => {
    setAddProjectDialogOpen(false);
    setNewProjectName('');
  };

  const handleAddProjectSubmit = () => {
    if (newProjectName.trim()) {
      createProject(currentTeam?.id, newProjectName);
      handleAddProjectClose();
    }
  };

  const handleInviteSubmit = () => {
    if (inviteEmail.trim()) {
      inviteUser(inviteEmail);
      setInviteEmail('');
      closeInvite();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
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
        background:
          'linear-gradient(to bottom, #ffe4e6, rgba(255,255,255,0.9))',
        borderRight: '1px solid rgba(244,167,185,0.5)',
        borderRadius: 0,
        backdropFilter: 'blur(8px)',
        boxShadow: '4px 0 12px rgba(0,0,0,0.05)',
        p: 2,
        overflow: 'hidden',
      }}
    >
      <Box>
        <UserProfile user={user} openInvite={openInvite} />

        <InviteDialog
          open={inviteOpen}
          onClose={closeInvite}
          inviteEmail={inviteEmail}
          setInviteEmail={setInviteEmail}
          handleInviteSubmit={handleInviteSubmit}
          inviteLoading={inviteLoading}
          teamName={currentTeam?.name}
        />

        <TeamSelector
          currentTeam={currentTeam}
          teams={teams}
          handleTeamSelect={handleTeamSelect}
          openCreateTeamDialog={() => setCreateTeamDialogOpen(true)}
        />

        <CreateTeamDialog
          open={createTeamDialogOpen}
          onClose={() => setCreateTeamDialogOpen(false)}
          teamName={newTeamName}
          setTeamName={setNewTeamName}
          handleSubmit={handleCreateTeamSubmit}
        />

        <PendingInvites
          invites={receivedInvites}
          onAccept={acceptInvite}
          onDecline={declineInvite}
        />

        <ProjectsList
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          openAddProjectDialog={handleAddProjectOpen}
        />
      </Box>

      <AddProjectDialog
        open={addProjectDialogOpen}
        onClose={handleAddProjectClose}
        projectName={newProjectName}
        setProjectName={setNewProjectName}
        handleSubmit={handleAddProjectSubmit}
        teamName={currentTeam?.name}
      />

      <SidebarFooter />
    </Paper>
  );
}
