import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Trash2, Edit, Plus, Eye, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Stats state
  const [stats, setStats] = useState(null);

  // Generic data state
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const tabs = [
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'users', label: 'Users' },
    { id: 'teams', label: 'Teams' },
    { id: 'projects', label: 'Projects' },
    { id: 'sprints', label: 'Sprints' },
    { id: 'boards', label: 'Boards' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'labels', label: 'Labels' },
    { id: 'comments', label: 'Comments' },
  ];

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

      // Handle different response structures
      let responseData = [];
      let responseTotal = 0;
      let responsePage = currentPage;

      if (tabId === 'users' && response.users) {
        responseData = response.users;
        responseTotal = response.total || 0;
        responsePage = parseInt(response.page) || currentPage;
      } else {
        // For other endpoints that might have different structures
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
    if (!confirm('Are you sure you want to delete this item?')) return;

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

  const renderFormFields = () => {
    const commonInputClass =
      'w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent';

    switch (activeTab) {
      case 'users':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className={commonInputClass}
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className={commonInputClass}
                value={formData.email || ''}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            {modalMode === 'create' && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className={commonInputClass}
                  value={formData.password || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            )}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formData.isAdmin || false}
                  onChange={(e) =>
                    setFormData({ ...formData, isAdmin: e.target.checked })
                  }
                />
                Is Admin
              </label>
            </div>
          </>
        );

      case 'teams':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className={commonInputClass}
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className={commonInputClass}
                value={formData.description || ''}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="3"
              />
            </div>
          </>
        );

      case 'projects':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className={commonInputClass}
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className={commonInputClass}
                value={formData.description || ''}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Team ID</label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.teamId || ''}
                onChange={(e) =>
                  setFormData({ ...formData, teamId: parseInt(e.target.value) })
                }
                required
              />
            </div>
          </>
        );

      case 'sprints':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className={commonInputClass}
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                className={commonInputClass}
                value={formData.startDate || ''}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                className={commonInputClass}
                value={formData.endDate || ''}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Project ID
              </label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.projectId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectId: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </>
        );

      case 'labels':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className={commonInputClass}
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="color"
                className={commonInputClass}
                value={formData.color || '#000000'}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                required
              />
            </div>
          </>
        );

      case 'boards':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className={commonInputClass}
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Sprint ID
              </label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.sprintId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sprintId: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </>
        );

      case 'tasks':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className={commonInputClass}
                value={formData.title || ''}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className={commonInputClass}
                value={formData.description || ''}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Project ID
              </label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.projectId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectId: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Sprint ID (Optional)
              </label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.sprintId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sprintId: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Board Column ID
              </label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.boardColumnId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    boardColumnId: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Assigned User ID (Optional)
              </label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.assignedUserId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignedUserId: e.target.value
                      ? parseInt(e.target.value)
                      : null,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Created By User ID
              </label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.createdById || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    createdById: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </>
        );

      case 'comments':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                className={commonInputClass}
                value={formData.content || ''}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Task ID</label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.taskId || ''}
                onChange={(e) =>
                  setFormData({ ...formData, taskId: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Author ID
              </label>
              <input
                type="number"
                className={commonInputClass}
                value={formData.authorId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    authorId: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </>
        );

      default:
        return (
          <div className="text-gray-500">
            Form fields for {activeTab} are not yet implemented. You can extend
            this component to add specific forms for each entity type.
          </div>
        );
    }
  };

  const renderTableHeader = () => {
    switch (activeTab) {
      case 'users':
        return (
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Admin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        );
      case 'teams':
        return (
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        );
      case 'labels':
        return (
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        );
      default:
        return (
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        );
    }
  };

  const renderTableRow = (item, index) => {
    switch (activeTab) {
      case 'users':
        return (
          <tr key={item.id || index} className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  item.isAdmin
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {item.isAdmin ? 'Yes' : 'No'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal('view', item)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => openModal('edit', item)}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        );
      case 'teams':
        return (
          <tr key={item.id || index} className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.name}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
              {item.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal('view', item)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => openModal('edit', item)}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        );
      case 'labels':
        return (
          <tr key={item.id || index} className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div className="flex items-center">
                <div
                  className="w-6 h-6 rounded mr-2 border"
                  style={{ backgroundColor: item.color }}
                ></div>
                {item.color}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal('view', item)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => openModal('edit', item)}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        );
      default:
        return (
          <tr key={item.id || index} className="bg-white border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.id}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <pre className="text-xs">{JSON.stringify(item, null, 2)}</pre>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal('view', item)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => openModal('edit', item)}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        );
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {Icon && <Icon size={16} className="mr-2" />}
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Statistics */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats &&
              Object.entries(stats).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BarChart3 className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate capitalize">
                            {key}
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {value}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Data Tables */}
        {activeTab !== 'stats' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">
                {activeTab.replace('-', ' ')}
              </h3>
              <button
                onClick={() => openModal('create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add New
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>{renderTableHeader()}</thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((item, index) => renderTableRow(item, index))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{' '}
                          <span className="font-medium">
                            {(page - 1) * limit + 1}
                          </span>{' '}
                          to{' '}
                          <span className="font-medium">
                            {Math.min(page * limit, total)}
                          </span>{' '}
                          of <span className="font-medium">{total}</span>{' '}
                          results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Previous
                          </button>
                          {Array.from(
                            { length: Math.min(5, totalPages) },
                            (_, i) => {
                              const pageNum = i + 1;
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => handlePageChange(pageNum)}
                                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    page === pageNum
                                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            },
                          )}
                          <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
                  {modalMode} {activeTab.replace('-', ' ')}
                </h3>

                {modalMode === 'view' ? (
                  <div className="space-y-3">
                    <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
                      {JSON.stringify(selectedItem, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {renderFormFields()}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </form>
                )}

                {modalMode === 'view' && (
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
