import { useState, useEffect } from 'react';
import { sidebarService } from '../services/sidebarService';

export function useSidebarViewModel() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add Member flows
  const [inviteOpen, setInviteOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [inviteLoading, setInviteLoading] = useState(false);

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
        
        if (teamList.length > 0) {
          setCurrentTeam(teamList[0]);
        }
      } catch (error) {
        console.error("Failed to initialize sidebar:", error);
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
          
          // Set the active project to the first regular project (not '+ New Project')
          const firstRegularProject = projectList.find(p => p !== "+ New Project");
          if (firstRegularProject) {
            setActiveProject(firstRegularProject);
          }
        } catch (error) {
          console.error("Failed to load projects:", error);
          setProjects([]);
          setActiveProject(null);
        }
      }
    }
    loadProjects();
  }, [currentTeam]);

  const changeTeam = async (team) => {
    setCurrentTeam(team);
    setActiveProject(null); // Reset active project when changing team
  };

  // Invite flows
  const openInvite = () => setInviteOpen(true);
  const closeInvite = () => { 
    setInviteOpen(false); 
    setUserQuery(''); 
    setUserResults([]); 
  };

  const searchUsers = async (query) => {
    setUserQuery(query);
    if (query.length < 2) {
      setUserResults([]);
    } else {
      try {
        const res = await sidebarService.getUsers(query);
        setUserResults(res);
      } catch (error) {
        console.error("Failed to search users:", error);
        setUserResults([]);
      }
    }
  };

  const inviteUser = async (userId) => {
    setInviteLoading(true);
    try {
      await sidebarService.addUserToTeam(currentTeam.id, userId);
      closeInvite();
    } catch (error) {
      console.error("Failed to invite user:", error);
    } finally {
      setInviteLoading(false);
    }
  };

  const createNewProject = () => {
    // This would typically open a dialog or navigate to a new project creation page
    console.error("Create new project for team:", currentTeam?.name);
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
    createNewProject,
    // invite
    inviteOpen,
    openInvite,
    closeInvite,
    userQuery,
    userResults,
    inviteLoading,
    searchUsers,
    inviteUser,
  };
}