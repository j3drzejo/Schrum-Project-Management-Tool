export const sidebarService = {
  getUserInfo: async () => ({ id: 1, name: 'Jane Doe', avatar: null }),

  getTeams: async () => [
    { id: 1, name: 'Team Alpha' },
    { id: 2, name: 'Team Beta' },
    { id: 3, name: 'Team Gamma' },
  ],

  getProjects: async (teamId) => {
    const projectsMap = {
      1: ['Dashboard UI', 'Onboarding Flow'],
      2: ['Analytics Module', 'API Integration'],
      3: ['Marketing Site', 'SEO Optimization'],
    };
    return [...(projectsMap[teamId] || []), '+ New Project'];
  },

  getUsers: async (query) => {
    // Mock user directory; filter by query
    const all = [
      { id: 2, name: 'Alice Smith' },
      { id: 3, name: 'Bob Johnson' },
      { id: 4, name: 'Charlie Lee' },
      { id: 5, name: 'Dana Park' },
      { id: 6, name: 'Elliot Chen' },
      { id: 7, name: 'Frances Kim' },
    ];
    return all.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase()),
    );
  },

  addUserToTeam: async (teamId, userId) => {
    // Mock success
    return { success: true };
  },

  createProject: async (teamId, projectName) => {
    // Mock project creation
    return { id: Math.floor(Math.random() * 1000), name: projectName };
  },

  createTeam: async (teamName) => {
    return { name: teamName };
  },

  getInvites: async () => [
    { id: 101, team: 'Team Beta', from: 'Alice Smith' },
    { id: 102, team: 'Team Gamma', from: 'Bob Johnson' },
  ],

  acceptInvite: async (inviteId) => {
    console.log(`Accepted invite ${inviteId}`);
    return { success: true };
  },
  declineInvite: async (inviteId) => {
    console.log(`Declined invite ${inviteId}`);
    return { success: true };
  },
};
