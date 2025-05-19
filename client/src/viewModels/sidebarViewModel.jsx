import { useState, useEffect } from 'react';
import { sidebarService } from '../services/sidebarService';
import Cookies from 'js-cookie';

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
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function init() {
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found, redirecting to login');
        window.location.href = '/';
        return;
      }

      setLoading(true);
      try {
        const [userInfo, teamsData] = await Promise.all([
          sidebarService.getUserInfo(),
          sidebarService.getTeams(),
        ]);
        console.log('User Info:', userInfo);
        setUser(userInfo);
        console.log('Teams Data:', teamsData);
        setTeams(teamsData);

        if (teamsData.length > 0) {
          const firstTeam = teamsData[0];
          setCurrentTeam(firstTeam);
          setProjects(firstTeam.projects);
          setActiveProject(firstTeam.projects[0] ?? null);
        }
      } catch (error) {
        console.error('Failed to initialize sidebar:', error);
        setErrorMessage(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (currentTeam?.projects) {
      setProjects(currentTeam?.projects);
      setActiveProject(currentTeam?.projects[0]);
    }
  }, [currentTeam]);

  useEffect(() => {
    async function loadInvites() {
      try {
        const invites = await sidebarService.getInvites();
        console.log('Received Invites:', invites);
        setReceivedInvites(invites);
      } catch (error) {
        console.error('Failed to load invites:', error);
        setErrorMessage(error.message || 'An unexpected error occurred');
      }
    }
    loadInvites();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const changeTeam = (team) => {
    setCurrentTeam(team);
    setActiveProject(null);
  };

  const openInvite = () => setInviteOpen(true);
  const closeInvite = () => {
    setInviteOpen(false);
    setUserQuery('');
    setUserResults([]);
  };

  const inviteUser = async (email) => {
    if (!currentTeam?.id || !email) return;
    setInviteLoading(true);
    try {
      await sidebarService.addUserToTeam(currentTeam.id, email);
      closeInvite();
    } catch (error) {
      console.error('Failed to invite user:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setInviteLoading(false);
    }
  };

  const createTeam = async (name) => {
    try {
      setLoading(true);
      const newTeam = await sidebarService.createTeam(name);
      setTeams((prev) => [...prev, newTeam]);
      setCurrentTeam(newTeam);
    } catch (error) {
      console.error('Failed to create team:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (teamId, name) => {
    try {
      setLoading(true);
      const newProject = await sidebarService.createProject(teamId, name);
      setProjects((prev) => [...prev, newProject]);
      setActiveProject(newProject);
    } catch (error) {
      console.error('Failed to create project:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (inviteId) => {
    try {
      setLoading(true);
      await sidebarService.acceptInvite(inviteId);
      setReceivedInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
      await sidebarService.getTeams();
    } catch (error) {
      console.error('Failed to accept invite:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  const declineInvite = async (inviteId) => {
    try {
      setLoading(true);
      await sidebarService.declineInvite(inviteId);
      setReceivedInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
      await sidebarService.getTeams();
    } catch (error) {
      console.error('Failed to decline invite:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
      setLoading(false);
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
    setUserQuery,
    userResults,
    inviteLoading,
    inviteUser,
    receivedInvites,
    acceptInvite,
    declineInvite,
    createProject,
    errorMessage,
  };
}
