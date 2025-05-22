import { useSidebar } from '../contexts/SidebarContext/useSidebar';
import { tasksService } from '../services';
import { taskHistoryService } from '../services';
import { labelsService } from '../services';
import { commentsService } from '../services'; // Import the commentsService
import { useEffect, useState } from 'react';

export function useTaskViewModel({ taskId }) {
  const { currentTeam, activeProject } = useSidebar();

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedUser, setAssignedUser] = useState(null);
  const [boardColumn, setBoardColumn] = useState(null);
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [history, setHistory] = useState([]);
  const [labels, setLabels] = useState([]);
  const [comments, setComments] = useState([]); // State for comments

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [commentsLoading, setCommentsLoading] = useState(false); // Loading state for comments
  const [commentContent, setCommentContent] = useState(''); // State for new comment content

  useEffect(() => {
    async function fetchTask() {
      if (!taskId) return;

      setLoading(true);
      setErrorMessage(null);

      try {
        const data = await tasksService.getTaskById(taskId);
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || '');
        setAssignedUser(data.assignedUser);
        setBoardColumn(data.boardColumn);
        setCreatedAt(data.createdAt);
        setUpdatedAt(data.updatedAt);

        const historyData = await taskHistoryService.getTaskHistory(taskId);
        setHistory(historyData || []);

        // Try to fetch labels using tasksService first, fallback to labelsService
        try {
          // Use tasksService.getTaskLabels which calls /tasks/${taskId}/labels
          const labelsData = await tasksService.getTaskLabels(taskId);
          const validLabels = (labelsData || []).filter(
            (label) => label && label.id && label.name && label.name.trim(),
          );
          setLabels(validLabels);
        } catch (labelsError) {
          console.warn(
            'Failed to fetch labels via tasksService, trying labelsService:',
            labelsError,
          );
          try {
            // Fallback to labelsService
            const labelsData = await labelsService.getLabelsByTask(taskId);
            const validLabels = (labelsData || []).filter(
              (label) => label && label.id && label.name && label.name.trim(),
            );
            setLabels(validLabels);
          } catch (fallbackError) {
            console.error(
              'Failed to fetch labels via both services:',
              fallbackError,
            );
            setLabels([]);
          }
        }

        // Fetch comments for this task - moved inside to fix dependency issue
        await fetchCommentsData();
      } catch (error) {
        console.error('Error fetching task data:', error);
        setErrorMessage(error.message || 'Failed to load task data');
      } finally {
        setLoading(false);
      }
    }

    // Function to fetch comments - defined inside useEffect to avoid dependency issues
    async function fetchCommentsData() {
      if (!taskId) return;

      setCommentsLoading(true);
      try {
        const commentsData = await commentsService.getCommentsByTask(taskId);
        setComments(commentsData || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Don't set error message here to avoid disrupting the main task view
      } finally {
        setCommentsLoading(false);
      }
    }

    fetchTask();
  }, [taskId, refreshTrigger]);

  // Function to add a comment
  const addComment = async (content) => {
    if (!taskId || !content.trim()) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      const newComment = await commentsService.createComment(taskId, content);
      setComments((prevComments) => [...prevComments, newComment]);
      setSuccessMessage('Comment added successfully');
      setCommentContent(''); // Clear the input field
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage(error.message || 'Failed to add comment');
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Function to update a comment
  const updateComment = async (commentId, content) => {
    if (!commentId || !content.trim()) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      const updatedComment = await commentsService.updateComment(
        commentId,
        content,
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? updatedComment : comment,
        ),
      );
      setSuccessMessage('Comment updated successfully');
      return updatedComment;
    } catch (error) {
      console.error('Error updating comment:', error);
      setErrorMessage(error.message || 'Failed to update comment');
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Function to delete a comment
  const deleteComment = async (commentId) => {
    if (!commentId) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      await commentsService.deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
      setSuccessMessage('Comment deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      setErrorMessage(error.message || 'Failed to delete comment');
      return false;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const updateTaskDetails = async (updatedFields) => {
    if (!taskId) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      const updatedTask = await tasksService.updateTask(taskId, {
        ...updatedFields,
      });

      setTask(updatedTask);
      if (updatedFields.title) setTitle(updatedFields.title);
      if (updatedFields.description) setDescription(updatedFields.description);
      if (updatedFields.boardColumn) setBoardColumn(updatedFields.boardColumn);
      setUpdatedAt(updatedTask.updatedAt);

      setSuccessMessage('Task updated successfully');
      setIsEditing(false);
      setRefreshTrigger((prev) => prev + 1);

      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      setErrorMessage(error.message || 'Failed to update task');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const moveTask = async (columnId, note = '') => {
    if (!taskId || !columnId) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      const updatedTask = await tasksService.moveTask(taskId, columnId, note);
      setBoardColumn(updatedTask.boardColumn);
      setTask(updatedTask);
      setUpdatedAt(updatedTask.updatedAt);
      setSuccessMessage('Task moved successfully');

      setRefreshTrigger((prev) => prev + 1);

      return updatedTask;
    } catch (error) {
      console.error('Error moving task:', error);
      setErrorMessage(error.message || 'Failed to move task');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const assignTask = async (userId) => {
    if (!taskId) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      const updatedTask = await tasksService.assignTask(taskId, userId);
      setAssignedUser(updatedTask.assignedUser);
      setTask(updatedTask);
      setUpdatedAt(updatedTask.updatedAt);
      setSuccessMessage('Task assigned successfully');

      setRefreshTrigger((prev) => prev + 1);

      return updatedTask;
    } catch (error) {
      console.error('Error assigning task:', error);
      setErrorMessage(error.message || 'Failed to assign task');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async () => {
    if (!taskId) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      await tasksService.deleteTask(taskId);
      setSuccessMessage('Task deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      setErrorMessage(error.message || 'Failed to delete task');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const addLabel = async (labelData) => {
    if (!taskId) return;

    // Validate label data
    const trimmedName = labelData.name?.trim();
    if (!trimmedName) {
      setErrorMessage('Label name cannot be empty');
      return null;
    }

    setSaving(true);
    setErrorMessage(null);

    try {
      // Try using tasksService first, then fallback to labelsService
      try {
        // Use tasksService.addTaskLabel which calls /tasks/${taskId}/labels
        const newLabel = await tasksService.addTaskLabel(taskId, {
          name: trimmedName,
          color: labelData.color,
        });
        setLabels((prev) => [...prev, newLabel]);
        setSuccessMessage('Label added successfully');
        return newLabel;
      } catch (tasksServiceError) {
        console.warn(
          'Failed to add label via tasksService, trying labelsService:',
          tasksServiceError,
        );

        // Fallback to labelsService approach
        const newLabel = await labelsService.createLabel(
          trimmedName,
          labelData.color,
        );

        // Then attach the label to the task
        await labelsService.addLabelToTask(taskId, { labelId: newLabel.id });

        setLabels((prev) => [...prev, newLabel]);
        setSuccessMessage('Label added successfully');
        return newLabel;
      }
    } catch (error) {
      console.error('Error adding label:', error);
      setErrorMessage(error.message || 'Failed to add label');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const removeLabel = async (labelId) => {
    if (!taskId || !labelId) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      // Try using tasksService first, then fallback to labelsService
      try {
        // Use tasksService.deleteTaskLabel which calls /tasks/${taskId}/labels/${labelId}
        await tasksService.deleteTaskLabel(taskId, labelId);
      } catch (tasksServiceError) {
        console.warn(
          'Failed to remove label via tasksService, trying labelsService:',
          tasksServiceError,
        );
        // Fallback to labelsService
        await labelsService.removeLabelFromTask(taskId, labelId);
      }

      setLabels((prev) => prev.filter((label) => label.id !== labelId));
      setSuccessMessage('Label removed successfully');
      return true;
    } catch (error) {
      console.error('Error removing label:', error);
      setErrorMessage(error.message || 'Failed to remove label');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const createTask = async (taskData) => {
    if (!activeProject?.id) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      const newTask = await tasksService.createTask(activeProject.id, taskData);
      setSuccessMessage('Task created successfully');
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      setErrorMessage(error.message || 'Failed to create task');
      return null;
    } finally {
      setSaving(false);
    }
  };

  const refreshTask = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Utility function to clean up blank labels
  const cleanupBlankLabels = async () => {
    const blankLabels = labels.filter(
      (label) => !label.name || !label.name.trim(),
    );

    for (const blankLabel of blankLabels) {
      try {
        await removeLabel(blankLabel.id);
      } catch (error) {
        console.error('Error removing blank label:', error);
      }
    }
  };

  return {
    currentTeam,
    activeProject,
    taskId,
    task,
    title,
    description,
    assignedUser,
    boardColumn,
    createdAt,
    updatedAt,
    history,
    labels,
    comments, // Expose comments state
    commentsLoading, // Expose comments loading state
    commentContent, // Expose comment content state
    setCommentContent, // Expose function to set comment content

    loading,
    saving,
    errorMessage,
    successMessage,
    isEditing,
    setIsEditing,

    updateTaskDetails,
    moveTask,
    assignTask,
    deleteTask,
    addLabel,
    removeLabel,
    createTask,
    refreshTask,
    addComment, // Expose function to add comments
    updateComment, // Expose function to update comments
    deleteComment, // Expose function to delete comments
    cleanupBlankLabels, // Expose function to cleanup blank labels

    setTitle,
    setDescription,
  };
}
