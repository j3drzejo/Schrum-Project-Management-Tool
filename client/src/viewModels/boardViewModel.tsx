import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSidebar } from '../contexts/SidebarContext/useSidebar';
import {
  boardsService,
  tasksService,
  sprintsService,
  teamsService,
} from '../services';
import { format, addDays } from 'date-fns';
import { CreateTaskDto } from '../types';

const DEFAULT_SPRINT_DURATION_DAYS = 14;

export function useBoardViewModel() {
  const { activeProject, currentTeam } = useSidebar();

  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [currentSprint, setCurrentSprint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movingTask, setMovingTask] = useState(false);

  const [sprintDialogOpen, setSprintDialogOpen] = useState(false);
  const [sprintName, setSprintName] = useState('');
  const [sprintStartDate, setSprintStartDate] = useState('');
  const [sprintEndDate, setSprintEndDate] = useState('');
  const [createSprintLoading, setCreateSprintLoading] = useState(false);

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssigneeId, setTaskAssigneeId] = useState(0);
  const [teamUsers, setTeamUsers] = useState([]);
  const [createTaskLoading, setCreateTaskLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [endSprintLoading, setEndSprintLoading] = useState(false);

  const sortedColumns = useMemo(
    () => board?.columns?.sort((a, b) => a.position - b.position) || [],
    [board?.columns],
  );

  const fetchBoardData = useCallback(async () => {
    if (!activeProject?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const sprintData = await sprintsService.getSprintsByProject(
        activeProject.id,
      );

      if (!sprintData) {
        setCurrentSprint(null);
        setBoard(null);
        setTasks([]);
        setLoading(false);
        return;
      }

      setCurrentSprint(sprintData);

      const [boardData, tasksData] = await Promise.all([
        boardsService.getBoardBySprint(sprintData.id),
        tasksService.getTasksByProject(activeProject.id),
      ]);

      setBoard(boardData);
      setTasks(tasksData || []);
    } catch (error) {
      console.error('Error fetching board data:', error);
      setError(error.message || 'Failed to load board data');
    } finally {
      setLoading(false);
    }
  }, [activeProject?.id]);

  const fetchTeamUsers = useCallback(async () => {
    if (!currentTeam?.id) return;

    try {
      const teamData = await teamsService.getTeamById(currentTeam.id);
      setTeamUsers(teamData.users || []);
    } catch (error) {
      console.error('Error fetching team users:', error);
    }
  }, [currentTeam?.id]);

  useEffect(() => {
    fetchBoardData();
  }, [fetchBoardData]);

  useEffect(() => {
    fetchTeamUsers();
  }, [fetchTeamUsers]);

  const handleDragEnd = useCallback(
    async ({ active, over }) => {
      if (!over || !active.data.current || !over.data.current) return;

      const taskId = active.data.current.taskId;
      const sourceColumnId = active.data.current.columnId;
      const targetColumnId = over.data.current.columnId;

      if (sourceColumnId === targetColumnId) return;

      setMovingTask(true);

      try {
        await tasksService.moveTask(taskId, {
          columnId: targetColumnId,
          note: `Moved from ${sourceColumnId} to ${targetColumnId}`,
        });

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  boardColumn: board.columns.find(
                    (col) => col.id === targetColumnId,
                  ),
                }
              : task,
          ),
        );

        setSuccessMessage('Task moved successfully');
      } catch (error) {
        console.error('Error moving task:', error);
        setErrorMessage(error.message || 'Failed to move task');
      } finally {
        setMovingTask(false);
      }
    },
    [board?.columns],
  );

  const handleCreateSprint = useCallback(async () => {
    if (
      !activeProject?.id ||
      !sprintName.trim() ||
      !sprintStartDate ||
      !sprintEndDate
    ) {
      setErrorMessage('Please fill in all sprint details');
      return;
    }

    setCreateSprintLoading(true);

    try {
      const newSprint = await sprintsService.createSprint(activeProject.id, {
        name: sprintName.trim(),
        startDate: sprintStartDate,
        endDate: sprintEndDate,
      });

      setCurrentSprint(newSprint);
      setSprintDialogOpen(false);
      setSprintName('');
      setSprintStartDate('');
      setSprintEndDate('');
      setSuccessMessage('Sprint created successfully');

      const [boardData, tasksData] = await Promise.all([
        boardsService.createForSprint(newSprint.id, {
          name: sprintName.trim(),
        }),
        tasksService.getTasksByProject(activeProject.id),
      ]);

      console.log(boardData.data);
      console.log(tasksData);

      setBoard(boardData.data);
      setTasks(tasksData || []);
    } catch (error) {
      console.error('Error creating sprint:', error);
      setErrorMessage(error.message || 'Failed to create sprint');
    } finally {
      setCreateSprintLoading(false);
    }
  }, [activeProject?.id, sprintName, sprintStartDate, sprintEndDate]);

  const handleEndSprint = useCallback(async () => {
    if (!currentSprint?.id) {
      setErrorMessage('No active sprint to end');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to end "${currentSprint.name}"? This will:\n\n` +
        '• Set the sprint end date to today\n' +
        '• Delete all tasks in "Ready for Prod" column\n' +
        '• This action cannot be undone',
    );

    if (!confirmed) return;

    setEndSprintLoading(true);

    try {
      const today = format(new Date(), 'yyyy-MM-dd');

      const readyForProdColumn = board?.columns?.find(
        (col) => col.name === 'ready-for-prod',
      );
      const tasksToDelete = readyForProdColumn
        ? tasks.filter((task) => task.boardColumn?.id === readyForProdColumn.id)
        : [];

      await sprintsService.updateSprint(currentSprint.id, {
        name: currentSprint.name,
        startDate: currentSprint.startDate,
        endDate: today,
      });

      if (tasksToDelete.length > 0) {
        await Promise.all(
          tasksToDelete.map((task) => tasksService.deleteTask(task.id)),
        );
      }

      setCurrentSprint((prev) => ({
        ...prev,
        endDate: today,
      }));

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) =>
            !tasksToDelete.some((deletedTask) => deletedTask.id === task.id),
        ),
      );

      setSuccessMessage(
        `Sprint ended successfully! ${tasksToDelete.length} completed tasks were archived.`,
      );
    } catch (error) {
      console.error('Error ending sprint:', error);
      setErrorMessage(error.message || 'Failed to end sprint');
    } finally {
      setEndSprintLoading(false);
    }
  }, [currentSprint, board?.columns, tasks]);

  const handleOpenSprintDialog = useCallback(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const futureDate = format(
      addDays(new Date(), DEFAULT_SPRINT_DURATION_DAYS),
      'yyyy-MM-dd',
    );

    setSprintName('Sprint');
    setSprintStartDate(today);
    setSprintEndDate(futureDate);
    setSprintDialogOpen(true);
  }, []);

  const handleAddTask = useCallback((columnId) => {
    setSelectedColumnId(columnId);
    setTaskTitle('');
    setTaskDescription('');
    setTaskAssigneeId(0);
    setTaskDialogOpen(true);
  }, []);

  const handleCloseTaskDialog = useCallback(() => {
    setTaskDialogOpen(false);
    setSelectedColumnId(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskAssigneeId(0);
  }, []);

  const handleCreateTask = useCallback(async () => {
    if (!activeProject?.id || !taskTitle.trim() || !selectedColumnId) {
      setErrorMessage('Please fill in required task details');
      return;
    }

    setCreateTaskLoading(true);

    try {
      const taskData: CreateTaskDto = {
        title: taskTitle.trim(),
        description: taskDescription.trim(),
        projectId: activeProject.id,
        sprintId: currentSprint.id,
        boardColumnId: selectedColumnId,
        assignedUserId: taskAssigneeId || null,
      };

      const newTask = await tasksService.createTask(activeProject.id, taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setSuccessMessage('Task created successfully');
      handleCloseTaskDialog();
    } catch (error) {
      console.error('Error creating task:', error);
      setErrorMessage(error.message || 'Failed to create task');
    } finally {
      setCreateTaskLoading(false);
    }
  }, [
    activeProject?.id,
    taskTitle,
    taskDescription,
    selectedColumnId,
    currentSprint?.id,
    taskAssigneeId,
    handleCloseTaskDialog,
  ]);

  const handleCloseSnackbar = useCallback((setter) => () => setter(''), []);

  return {
    activeProject,
    board,
    tasks,
    currentSprint,
    loading,
    error,
    movingTask,
    sortedColumns,

    sprintDialogOpen,
    setSprintDialogOpen,
    sprintName,
    setSprintName,
    sprintStartDate,
    setSprintStartDate,
    sprintEndDate,
    setSprintEndDate,
    createSprintLoading,
    endSprintLoading,

    taskDialogOpen,
    selectedColumnId,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    taskAssigneeId,
    setTaskAssigneeId,
    teamUsers,
    createTaskLoading,

    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,

    handleDragEnd,
    handleCreateSprint,
    handleEndSprint,
    handleOpenSprintDialog,
    handleAddTask,
    handleCloseTaskDialog,
    handleCreateTask,
    handleCloseSnackbar,
  };
}
