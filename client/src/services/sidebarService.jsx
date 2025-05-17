export const sidebarService = {
  getUserInfo: async () => ({ id: 1, name: "Jane Doe", avatar: null }),
  
  getTeams: async () => [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
  ],
  
  getProjects: async (teamId) => {
    const projectsMap = {
      1: ["Dashboard UI", "Onboarding Flow"],
      2: ["Analytics Module", "API Integration"],
      3: ["Marketing Site", "SEO Optimization"],
    };
    return [...(projectsMap[teamId] || []), "+ New Project"];
  },
  
  getProjectDetails: async (projectName, teamId) => {
    // This would typically fetch project details from an API
    // Mocking data for demonstration
    const detailsMap = {
      "Dashboard UI": {
        description: "User interface for the main dashboard",
        tasks: 8,
        completedTasks: 3,
        members: 4,
        dueDate: "2025-06-15"
      },
      "Onboarding Flow": {
        description: "User onboarding experience",
        tasks: 12,
        completedTasks: 5,
        members: 3,
        dueDate: "2025-06-30"
      },
      "Analytics Module": {
        description: "Data analytics and reporting",
        tasks: 15,
        completedTasks: 2,
        members: 5,
        dueDate: "2025-07-10"
      },
      "API Integration": {
        description: "Third-party API integration",
        tasks: 10,
        completedTasks: 1,
        members: 2,
        dueDate: "2025-06-25"
      },
      "Marketing Site": {
        description: "Public marketing website",
        tasks: 20,
        completedTasks: 8,
        members: 6,
        dueDate: "2025-08-01"
      },
      "SEO Optimization": {
        description: "Search engine optimization",
        tasks: 7,
        completedTasks: 0,
        members: 2,
        dueDate: "2025-07-15"
      }
    };
    
    return detailsMap[projectName] || {
      description: "No details available",
      tasks: 0,
      completedTasks: 0,
      members: 0,
      dueDate: null
    };
  },
  
  getUsers: async (query) => {
    // Mock user directory; filter by query
    const all = [
      { id: 2, name: "Alice Smith" },
      { id: 3, name: "Bob Johnson" },
      { id: 4, name: "Charlie Lee" },
      { id: 5, name: "Dana Park" },
      { id: 6, name: "Elliot Chen" },
      { id: 7, name: "Frances Kim" },
    ];
    return all.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));
  },
  
  addUserToTeam: async (teamId, userId) => {
    // Mock success
    return { success: true };
  },
  
  createProject: async (teamId, projectName) => {
    // Mock project creation
    return { id: Math.floor(Math.random() * 1000), name: projectName };
  }
};