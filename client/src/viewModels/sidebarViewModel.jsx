import { useState, useEffect } from 'react';
import { sidebarService } from '../services/sidebarService';

export function useSidebarViewModel() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [receivedInvites, setReceivedInvites] = useState([]);

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const [userInfo, teamList] = await Promise.all([
          sidebarService.getUserInfo(),
          sidebarService.getTeams(),
        ]);
        setUser(userInfo);
        setTeams(teamList);
        if (teamList.length > 0) setCurrentTeam(teamList[0]);
      } catch (error) {
        console.error('Failed to initialize sidebar:', error);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    async function loadProjects() {
      if (currentTeam) {
        try {
          const projectList = await sidebarService.getProjects(currentTeam.id);
          setProjects(projectList);
          const firstRegularProject = projectList.find(
            (p) => p !== '+ New Project',
          );
          if (firstRegularProject) setActiveProject(firstRegularProject);
        } catch (error) {
          console.error('Failed to load projects:', error);
          setProjects([]);
          setActiveProject(null);
        }
      }
    }
    loadProjects();
  }, [currentTeam]);

  useEffect(() => {
    async function loadInvites() {
      try {
        const invites = await sidebarService.getInvites();
        setReceivedInvites(invites);
      } catch (error) {
        console.error('Failed to load invites:', error);
      }
    }
    loadInvites();
  }, []);

  const changeTeam = async (team) => {
    setCurrentTeam(team);
    setActiveProject(null);
  };

  const openInvite = () => setInviteOpen(true);
  const closeInvite = () => {
    setInviteOpen(false);
    setUserQuery('');
    setUserResults([]);
  };

  const inviteUser = async (userId) => {
    setInviteLoading(true);
    try {
      await sidebarService.addUserToTeam(currentTeam.id, userId);
      closeInvite();
    } catch (error) {
      console.error('Failed to invite user:', error);
    } finally {
      setInviteLoading(false);
    }
  };

  const searchUsers = async (query) => {
    setUserQuery(query);
    const results = await sidebarService.getUsers(query);
    setUserResults(results);
  };

  const createTeam = async (name) => {
    const newTeam = { id: Date.now(), name };
    setTeams((prev) => [...prev, newTeam]);
    setCurrentTeam(newTeam);
  };

  const acceptInvite = async (inviteId) => {
    try {
      await sidebarService.acceptInvite(inviteId);
      setReceivedInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
    } catch (error) {
      console.error('Failed to accept invite:', error);
    }
  };

  const declineInvite = async (inviteId) => {
    try {
      await sidebarService.declineInvite(inviteId);
      setReceivedInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
    } catch (error) {
      console.error('Failed to decline invite:', error);
    }
  };

  return {
    user,
    teams,
    currentTeam,
    projects,
    activeProject,
    setActiveProject,
    loading,
    changeTeam,
    createTeam,
    inviteOpen,
    openInvite,
    closeInvite,
    userQuery,
    userResults,
    inviteLoading,
    inviteUser,
    searchUsers,
    receivedInvites,
    acceptInvite,
    declineInvite,
  };
}
