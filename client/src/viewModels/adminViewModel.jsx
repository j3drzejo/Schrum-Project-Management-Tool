import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

export const useAdminViewModel = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [stats, setStats] = useState(null);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const loadStats = async () => {
    try {
      setLoading(true);
      const statsData = await adminService.getSystemStats();
      setStats(statsData);
    } catch (err) {
      console.error(err);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (tabId, currentPage = 1) => {
    try {
      setLoading(true);
      setError('');

      let response;
      switch (tabId) {
        case 'users':
          response = await adminService.getAllUsers(currentPage, limit);
          console.log(response);
          break;
        case 'teams':
          response = await adminService.getAllTeams(currentPage, limit);
          break;
        case 'projects':
          response = await adminService.getAllProjects(currentPage, limit);
          break;
        case 'sprints':
          response = await adminService.getAllSprints(currentPage, limit);
          break;
        case 'boards':
          response = await adminService.getAllBoards(currentPage, limit);
          break;
        case 'board-columns':
          response = await adminService.getAllBoardColumns(currentPage, limit);
          break;
        case 'tasks':
          response = await adminService.getAllTasks(currentPage, limit);
          break;
        case 'labels':
          response = await adminService.getAllLabels(currentPage, limit);
          break;
        case 'comments':
          response = await adminService.getAllComments(currentPage, limit);
          break;
        case 'team-invites':
          response = await adminService.getAllTeamInvites(currentPage, limit);
          break;
        case 'task-labels':
          response = await adminService.getAllTaskLabels(currentPage, limit);
          break;
        default:
          return;
      }

      let responseData = [];
      let responseTotal = 0;
      let responsePage = currentPage;

      if (tabId === 'users' && response.users) {
        responseData = response.users;
        responseTotal = response.total || 0;
        responsePage = parseInt(response.page) || currentPage;
      } else {
        responseData = response.data || response[tabId] || [];
        responseTotal = response.total || 0;
        responsePage = parseInt(response.page) || currentPage;
      }

      setData(responseData);
      setTotal(responseTotal);
      setPage(responsePage);
    } catch (err) {
      console.error(err);
      setError(`Failed to load ${tabId}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPage(1);
    if (tabId === 'stats') {
      loadStats();
    } else {
      loadData(tabId, 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadData(activeTab, newPage);
  };

  const openModal = (mode, item = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      setLoading(true);

      switch (activeTab) {
        case 'users':
          await adminService.deleteUser(id);
          console.log(id);
          break;
        case 'teams':
          await adminService.deleteTeam(id);
          break;
        case 'projects':
          await adminService.deleteProject(id);
          break;
        case 'sprints':
          await adminService.deleteSprint(id);
          break;
        case 'boards':
          await adminService.deleteBoard(id);
          break;
        case 'board-columns':
          await adminService.deleteBoardColumn(id);
          break;
        case 'tasks':
          await adminService.deleteTask(id);
          break;
        case 'labels':
          await adminService.deleteLabel(id);
          break;
        case 'comments':
          await adminService.deleteComment(id);
          break;
        case 'team-invites':
          await adminService.deleteTeamInvite(id);
          break;
      }

      loadData(activeTab, page);
    } catch (err) {
      console.error(err);
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (modalMode === 'create') {
        switch (activeTab) {
          case 'users':
            await adminService.createUser(formData);
            break;
          case 'teams':
            await adminService.createTeam(formData);
            break;
          case 'projects':
            await adminService.createProject(formData);
            break;
          case 'sprints':
            await adminService.createSprint(formData);
            break;
          case 'boards':
            await adminService.createBoard(formData);
            break;
          case 'board-columns':
            await adminService.createBoardColumn(formData);
            break;
          case 'tasks':
            await adminService.createTask(formData);
            break;
          case 'labels':
            await adminService.createLabel(formData);
            break;
          case 'comments':
            await adminService.createComment(formData);
            break;
          case 'team-invites':
            await adminService.createTeamInvite(formData);
            break;
          case 'task-labels':
            await adminService.createTaskLabel(formData);
            break;
        }
      } else if (modalMode === 'edit') {
        switch (activeTab) {
          case 'users':
            await adminService.updateUser(selectedItem.id, formData);
            break;
          case 'teams':
            await adminService.updateTeam(selectedItem.id, formData);
            break;
          case 'projects':
            await adminService.updateProject(selectedItem.id, formData);
            break;
          case 'sprints':
            await adminService.updateSprint(selectedItem.id, formData);
            break;
          case 'boards':
            await adminService.updateBoard(selectedItem.id, formData);
            break;
          case 'board-columns':
            await adminService.updateBoardColumn(selectedItem.id, formData);
            break;
          case 'tasks':
            await adminService.updateTask(selectedItem.id, formData);
            break;
          case 'labels':
            await adminService.updateLabel(selectedItem.id, formData);
            break;
          case 'comments':
            await adminService.updateComment(selectedItem.id, formData);
            break;
          case 'team-invites':
            await adminService.updateTeamInvite(selectedItem.id, formData);
            break;
        }
      }

      closeModal();
      loadData(activeTab, page);
    } catch (err) {
      console.error(err);
      setError('Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    loadStats();
  }, []);

  const totalPages = Math.ceil(total / limit);

  return {
    activeTab,
    loading,
    error,
    stats,
    data,
    total,
    page,
    limit,
    showModal,
    modalMode,
    selectedItem,
    formData,
    totalPages,

    setActiveTab,
    setError,
    loadStats,
    loadData,
    handleTabChange,
    handlePageChange,
    openModal,
    closeModal,
    handleDelete,
    handleSubmit,
    updateFormData,
  };
};
