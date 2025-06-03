import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import {
  SystemStats,
  PaginatedResponse,
  CreateUserDto,
  UpdateUserDto,
  CreateTeamDto,
  UpdateTeamDto,
  CreateProjectDto,
  UpdateProjectDto,
  CreateSprintDto,
  UpdateSprintDto,
  CreateBoardDto,
  UpdateBoardDto,
  CreateBoardColumnDto,
  UpdateBoardColumnDto,
  CreateTaskDto,
  UpdateTaskDto,
  CreateLabelDto,
  UpdateLabelDto,
  CreateCommentDto,
  UpdateCommentDto,
  CreateTeamInviteDto,
  UpdateTeamInviteDto,
  CreateTaskLabelDto,
} from '../types/dtos/admin.types.dto';
import { TabId, ModalMode, FormDataType } from '../types/admin/admin.types';

interface TabStrategy {
  loadData(page: number, limit: number): Promise<PaginatedResponse<any>>;
  deleteItem(id: number): Promise<void>;
  createItem(data: any): Promise<void>;
  updateItem(id: number, data: any): Promise<void>;
  processResponse(response: PaginatedResponse<any>): {
    data: any[];
    total: number;
    page: number;
  };
}

class UsersStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllUsers(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteUser(id);
  }

  async createItem(data: CreateUserDto): Promise<void> {
    return adminService.createUser(data);
  }

  async updateItem(id: number, data: UpdateUserDto): Promise<void> {
    return adminService.updateUser(id, data);
  }

  processResponse(response: any) {
    return {
      data: response.users || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class TeamsStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllTeams(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteTeam(id);
  }

  async createItem(data: CreateTeamDto): Promise<void> {
    return adminService.createTeam(data);
  }

  async updateItem(id: number, data: UpdateTeamDto): Promise<void> {
    return adminService.updateTeam(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any).teams || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class ProjectsStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllProjects(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteProject(id);
  }

  async createItem(data: CreateProjectDto): Promise<void> {
    return adminService.createProject(data);
  }

  async updateItem(id: number, data: UpdateProjectDto): Promise<void> {
    return adminService.updateProject(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any).projects || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class SprintsStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllSprints(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteSprint(id);
  }

  async createItem(data: CreateSprintDto): Promise<void> {
    return adminService.createSprint(data);
  }

  async updateItem(id: number, data: UpdateSprintDto): Promise<void> {
    return adminService.updateSprint(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any).sprints || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class BoardsStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllBoards(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteBoard(id);
  }

  async createItem(data: CreateBoardDto): Promise<void> {
    return adminService.createBoard(data);
  }

  async updateItem(id: number, data: UpdateBoardDto): Promise<void> {
    return adminService.updateBoard(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any).boards || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class BoardColumnsStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllBoardColumns(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteBoardColumn(id);
  }

  async createItem(data: CreateBoardColumnDto): Promise<void> {
    return adminService.createBoardColumn(data);
  }

  async updateItem(id: number, data: UpdateBoardColumnDto): Promise<void> {
    return adminService.updateBoardColumn(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any)['board-columns'] || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class TasksStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllTasks(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteTask(id);
  }

  async createItem(data: CreateTaskDto): Promise<void> {
    return adminService.createTask(data);
  }

  async updateItem(id: number, data: UpdateTaskDto): Promise<void> {
    return adminService.updateTask(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any).tasks || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class LabelsStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllLabels(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteLabel(id);
  }

  async createItem(data: CreateLabelDto): Promise<void> {
    return adminService.createLabel(data);
  }

  async updateItem(id: number, data: UpdateLabelDto): Promise<void> {
    return adminService.updateLabel(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any).labels || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class CommentsStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllComments(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteComment(id);
  }

  async createItem(data: CreateCommentDto): Promise<void> {
    return adminService.createComment(data);
  }

  async updateItem(id: number, data: UpdateCommentDto): Promise<void> {
    return adminService.updateComment(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any).comments || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class TeamInvitesStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllTeamInvites(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    return adminService.deleteTeamInvite(id);
  }

  async createItem(data: CreateTeamInviteDto): Promise<void> {
    return adminService.createTeamInvite(data);
  }

  async updateItem(id: number, data: UpdateTeamInviteDto): Promise<void> {
    return adminService.updateTeamInvite(id, data);
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any)['team-invites'] || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

class TaskLabelsStrategy implements TabStrategy {
  async loadData(page: number, limit: number): Promise<PaginatedResponse<any>> {
    return adminService.getAllTaskLabels(page, limit);
  }

  async deleteItem(id: number): Promise<void> {
    throw new Error('Delete not supported for task labels');
  }

  async createItem(data: CreateTaskLabelDto): Promise<void> {
    return adminService.createTaskLabel(data);
  }

  async updateItem(id: number, data: any): Promise<void> {
    throw new Error('Update not supported for task labels');
  }

  processResponse(response: PaginatedResponse<any>) {
    return {
      data: response.data || (response as any)['task-labels'] || [],
      total: response.total || 0,
      page: parseInt(String(response.page)) || 1,
    };
  }
}

const tabStrategies: Record<TabId, TabStrategy | null> = {
  stats: null,
  users: new UsersStrategy(),
  teams: new TeamsStrategy(),
  projects: new ProjectsStrategy(),
  sprints: new SprintsStrategy(),
  boards: new BoardsStrategy(),
  'board-columns': new BoardColumnsStrategy(),
  tasks: new TasksStrategy(),
  labels: new LabelsStrategy(),
  comments: new CommentsStrategy(),
  'team-invites': new TeamInvitesStrategy(),
  'task-labels': new TaskLabelsStrategy(),
};

interface AdminViewModelReturn {
  activeTab: TabId;
  loading: boolean;
  error: string;
  stats: SystemStats | null;
  data: any[];
  total: number;
  page: number;
  limit: number;
  showModal: boolean;
  modalMode: ModalMode;
  selectedItem: any | null;
  formData: FormDataType;
  totalPages: number;

  setActiveTab: (tab: TabId) => void;
  setError: (error: string) => void;
  loadStats: () => Promise<void>;
  loadData: (tabId: TabId, currentPage?: number) => Promise<void>;
  handleTabChange: (tabId: TabId) => void;
  handlePageChange: (newPage: number) => void;
  openModal: (mode: ModalMode, item?: any) => void;
  closeModal: () => void;
  handleDelete: (id: number) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  updateFormData: (field: keyof FormDataType, value: any) => void;
}

export const useAdminViewModel = (): AdminViewModelReturn => {
  const [activeTab, setActiveTab] = useState<TabId>('stats');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<FormDataType>({});

  const loadStats = async (): Promise<void> => {
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

  const loadData = async (
    tabId: TabId,
    currentPage: number = 1,
  ): Promise<void> => {
    const strategy = tabStrategies[tabId];
    if (!strategy) return;

    try {
      setLoading(true);
      setError('');

      const response = await strategy.loadData(currentPage, limit);
      const {
        data: responseData,
        total: responseTotal,
        page: responsePage,
      } = strategy.processResponse(response);

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

  const handleTabChange = (tabId: TabId): void => {
    setActiveTab(tabId);
    setPage(1);
    if (tabId === 'stats') {
      loadStats();
    } else {
      loadData(tabId, 1);
    }
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
    loadData(activeTab, newPage);
  };

  const openModal = (mode: ModalMode, item: any = null): void => {
    setModalMode(mode);
    setSelectedItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    const strategy = tabStrategies[activeTab];
    if (!strategy) return;

    try {
      setLoading(true);
      await strategy.deleteItem(id);
      loadData(activeTab, page);
    } catch (err) {
      console.error(err);
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const strategy = tabStrategies[activeTab];
    if (!strategy) return;

    try {
      setLoading(true);

      if (modalMode === 'create') {
        await strategy.createItem(formData);
      } else if (modalMode === 'edit' && selectedItem?.id) {
        await strategy.updateItem(selectedItem.id, formData);
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

  const updateFormData = (field: keyof FormDataType, value: any): void => {
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
