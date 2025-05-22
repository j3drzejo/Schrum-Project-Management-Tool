import { useState } from 'react';
import { useTaskViewModel } from '../../viewModels/taskViewModel';
import {
  Paper,
  Box,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Edit,
  Delete,
  Person,
  Label,
  Close,
  AccessTime,
  SaveAlt,
  MoreHoriz,
  Comment as CommentIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { teamsService } from '../../services/teamsService';
import TaskComments from './TaskComments'; // Import the TaskComments component

export default function TaskCard({ id }) {
  const {
    currentTeam,
    task,
    title,
    description,
    assignedUser,
    boardColumn,
    createdAt,
    updatedAt,
    history,
    labels,
    comments, // Get comments from the view model
    commentsLoading, // Get comments loading state
    commentContent, // Get comment content
    setCommentContent, // Get comment content setter
    loading,
    saving,
    errorMessage,
    successMessage,
    setIsEditing,
    updateTaskDetails,
    assignTask,
    deleteTask,
    addLabel,
    removeLabel,
    addComment, // Get add comment function
    updateComment, // Get update comment function
    deleteComment, // Get delete comment function
    setTitle,
    setDescription,
  } = useTaskViewModel({
    taskId: id,
  });

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [labelDialogOpen, setLabelDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [teamUsers, setTeamUsers] = useState([]);
  const [newLabel, setNewLabel] = useState({ name: '', color: '#F4A7B9' });
  const [usersLoading, setUsersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // For tabs (Activity/Comments)

  // Open the details dialog
  const handleOpenDetails = () => {
    setDetailsOpen(true);
  };

  // Close the details dialog
  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleEditOpen = () => {
    setEditDialogOpen(true);
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    await updateTaskDetails({
      title,
      description,
    });
    setEditDialogOpen(false);
  };

  const handleAssignOpen = () => {
    setAssignDialogOpen(true);

    // Fetch team users when assign dialog opens
    const fetchTeamUsers = async () => {
      if (!currentTeam?.id) return;

      setUsersLoading(true);
      try {
        const teamData = await teamsService.getTeamById(currentTeam.id);
        setTeamUsers(teamData.users || []);

        // Set selected user if task is already assigned
        if (assignedUser) {
          setSelectedUser(assignedUser.id);
        }
      } catch (error) {
        console.error('Error fetching team users:', error);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchTeamUsers();
  };

  const handleAssignClose = () => {
    setAssignDialogOpen(false);
  };

  const handleAssignSave = async () => {
    await assignTask(selectedUser);
    setAssignDialogOpen(false);
  };

  const handleLabelOpen = () => {
    setLabelDialogOpen(true);
  };

  const handleLabelClose = () => {
    setLabelDialogOpen(false);
    setNewLabel({ name: '', color: '#F4A7B9' });
  };

  const handleLabelSave = async () => {
    const trimmedLabelName = newLabel.name.trim();
    if (trimmedLabelName) {
      // Check if label with same name already exists to prevent duplicates
      const existingLabel = labels.find(
        (label) =>
          label.name &&
          label.name.trim().toLowerCase() === trimmedLabelName.toLowerCase(),
      );

      if (existingLabel) {
        // Could show an error message here if needed
        console.warn('Label with this name already exists');
        return;
      }

      await addLabel({ ...newLabel, name: trimmedLabelName });
      setNewLabel({ name: '', color: '#F4A7B9' });
      setLabelDialogOpen(false);
    }
  };

  const handleDeleteOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    const deleted = await deleteTask();
    if (deleted) {
      setDeleteDialogOpen(false);
      setDetailsOpen(false); // Close details dialog if task is deleted
    }
  };

  const handleRemoveLabel = async (labelId) => {
    await removeLabel(labelId);
  };

  // Handle tab change between Activity and Comments
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Stop event propagation for actions inside the card
  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <CircularProgress size={20} sx={{ color: '#F4A7B9' }} />
      </Box>
    );
  }

  if (!task) {
    return (
      <Box p={2}>
        <Alert severity="error" sx={{ fontSize: '0.8rem' }}>
          Task not found
        </Alert>
      </Box>
    );
  }

  return (
    <>
      {/* Task Card (Compact View) */}
      <Paper
        elevation={2}
        onClick={handleOpenDetails}
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: 'white',
          cursor: 'pointer',
          position: 'relative',
          minHeight: '120px',
          maxWidth: '350px',
          transition: 'all 0.2s ease',
          border: '1px solid rgba(0,0,0,0.08)',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 4px 12px rgba(244,167,185,0.25)',
            borderColor: 'rgba(244,167,185,0.3)',
          },
        }}
      >
        {/* Title truncated */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            mb: 1.5,
            color: '#333',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '48px',
          }}
        >
          {task.title}
        </Typography>

        {/* Labels (show max 2) */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            mb: 1.5,
            height: '24px',
            overflow: 'hidden',
          }}
        >
          {labels
            .filter((label) => label && label.name && label.name.trim()) // Filter out blank labels
            .slice(0, 2)
            .map((label) => (
              <Chip
                key={`compact-label-${label.id}-${label.name}`} // Unique key
                label={label.name}
                size="small"
                sx={{
                  height: '20px',
                  fontSize: '0.7rem',
                  backgroundColor: label.color || '#F4A7B9',
                  color: '#fff',
                }}
                onClick={(e) => handleActionClick(e)}
              />
            ))}
          {labels.filter((label) => label && label.name && label.name.trim())
            .length > 2 && (
            <Chip
              key="compact-label-more"
              label={`+${
                labels.filter(
                  (label) => label && label.name && label.name.trim(),
                ).length - 2
              }`}
              size="small"
              sx={{
                height: '20px',
                fontSize: '0.7rem',
                backgroundColor: '#f0f0f0',
                color: '#777',
              }}
              onClick={(e) => handleActionClick(e)}
            />
          )}
        </Box>

        {/* Footer with assigned user, comments count, and action button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: '#fff',
                background: 'linear-gradient(45deg, #F4A7B9, #ec8ca1)',
              }}
            >
              {assignedUser?.name?.charAt(0) || '?'}
            </Avatar>
            <Typography
              variant="caption"
              sx={{
                maxWidth: '80px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {assignedUser?.name || 'Unassigned'}
            </Typography>

            {/* Comments count indicator */}
            {comments && comments.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <CommentIcon
                  sx={{
                    fontSize: '14px',
                    color: '#F4A7B9',
                    mr: 0.5,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#F4A7B9',
                    fontSize: '0.7rem',
                    fontWeight: 'medium',
                  }}
                >
                  {comments.length}
                </Typography>
              </Box>
            )}
          </Box>

          <Tooltip title="Quick Actions">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDetails();
              }}
              sx={{
                color: '#F4A7B9',
                p: 0.5,
              }}
            >
              <MoreHoriz fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Task Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            pb: 2,
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Task Details
          <Box>
            <Tooltip title="Edit task">
              <IconButton
                onClick={(e) => {
                  handleActionClick(e);
                  handleEditOpen();
                }}
                size="small"
                sx={{
                  color: '#F4A7B9',
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(244,167,185,0.1)',
                  },
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete task">
              <IconButton
                onClick={(e) => {
                  handleActionClick(e);
                  handleDeleteOpen();
                }}
                size="small"
                sx={{
                  color: '#e57373',
                  '&:hover': {
                    backgroundColor: 'rgba(229,115,115,0.1)',
                  },
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#333"
              gutterBottom
            >
              {task.title}
            </Typography>

            {/* Status/Board Column */}
            {boardColumn && (
              <Box mb={2}>
                <Chip
                  label={boardColumn.name}
                  sx={{
                    backgroundColor:
                      boardColumn.color || 'rgba(244,167,185,0.2)',
                    color: '#333',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Description */}
          <Box sx={{ px: 3, mb: 3 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="#666"
              gutterBottom
            >
              Description
            </Typography>
            <Box
              sx={{
                backgroundColor: 'rgba(244,167,185,0.05)',
                p: 2,
                borderRadius: 2,
                whiteSpace: 'pre-wrap',
                minHeight: '80px',
              }}
            >
              <Typography variant="body2">
                {task.description || 'No description provided'}
              </Typography>
            </Box>
          </Box>

          {/* Two-column layout for details */}
          <Box sx={{ px: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
              }}
            >
              {/* Left column */}
              <Box sx={{ flex: 1 }}>
                {/* Assigned User */}
                <Box mb={3}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="#666"
                    gutterBottom
                  >
                    Assigned To
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        backgroundColor: 'rgba(244,167,185,0.1)',
                        borderRadius: 2,
                        p: 1,
                        pr: 2,
                        flexGrow: 0,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 1,
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          color: '#fff',
                          background:
                            'linear-gradient(45deg, #F4A7B9, #ec8ca1)',
                        }}
                      >
                        {assignedUser?.name?.charAt(0) || '?'}
                      </Avatar>
                      <Typography variant="body2" fontWeight="medium">
                        {assignedUser?.name || 'Unassigned'}
                      </Typography>
                    </Box>
                    <Button
                      startIcon={<Person />}
                      variant="outlined"
                      onClick={(e) => {
                        handleActionClick(e);
                        handleAssignOpen();
                      }}
                      size="small"
                      sx={{
                        ml: 2,
                        borderColor: '#F4A7B9',
                        color: '#F4A7B9',
                        '&:hover': {
                          borderColor: '#ec8ca1',
                          backgroundColor: 'rgba(244,167,185,0.1)',
                        },
                      }}
                    >
                      {assignedUser ? 'Reassign' : 'Assign'}
                    </Button>
                  </Box>
                </Box>

                {/* Labels */}
                <Box mb={3}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="#666"
                    gutterBottom
                  >
                    Labels
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {labels.length > 0 ? (
                      labels
                        .filter(
                          (label) => label && label.name && label.name.trim(),
                        ) // Filter out blank labels
                        .map((label) => (
                          <Chip
                            key={`label-${label.id}-${label.name}`} // Unique key with fallback
                            label={label.name}
                            sx={{
                              backgroundColor: label.color || '#F4A7B9',
                              color: '#fff',
                            }}
                            onDelete={(e) => {
                              handleActionClick(e);
                              handleRemoveLabel(label.id);
                            }}
                            deleteIcon={
                              <Close
                                sx={{
                                  color: 'rgba(255,255,255,0.8)',
                                  fontSize: '0.9rem',
                                }}
                              />
                            }
                          />
                        ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No labels added
                      </Typography>
                    )}
                  </Box>
                  <Button
                    startIcon={<Label />}
                    size="small"
                    onClick={(e) => {
                      handleActionClick(e);
                      handleLabelOpen();
                    }}
                    sx={{
                      mt: 1,
                      color: '#F4A7B9',
                      '&:hover': {
                        backgroundColor: 'rgba(244,167,185,0.1)',
                      },
                    }}
                  >
                    Add Label
                  </Button>
                </Box>

                {/* Created/Updated timestamps */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="#666"
                    gutterBottom
                  >
                    Timestamps
                  </Typography>
                  <Box sx={{ pl: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Created:</strong>{' '}
                      {createdAt
                        ? format(new Date(createdAt), "MMM d, yyyy 'at' h:mm a")
                        : 'Unknown'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Last updated:</strong>{' '}
                      {updatedAt
                        ? format(new Date(updatedAt), "MMM d, yyyy 'at' h:mm a")
                        : 'Unknown'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Right column - Activity and Comments with Tabs */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                      '& .MuiTab-root': {
                        color: '#666',
                        '&.Mui-selected': {
                          color: '#F4A7B9',
                        },
                      },
                      '& .MuiTabs-indicator': {
                        backgroundColor: '#F4A7B9',
                      },
                    }}
                  >
                    <Tab
                      icon={<HistoryIcon />}
                      label="Activity"
                      iconPosition="start"
                    />
                    <Tab
                      icon={<CommentIcon />}
                      label={`Comments${
                        comments?.length ? ` (${comments.length})` : ''
                      }`}
                      iconPosition="start"
                    />
                  </Tabs>
                </Box>

                {/* Tab Content */}
                {activeTab === 0 && (
                  // Activity History Tab
                  <Box>
                    <Box
                      sx={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                        backgroundColor: 'rgba(244,167,185,0.05)',
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      {history.length > 0 ? (
                        history.map((item, index) => (
                          <Box
                            key={`history-${item.id || index}-${
                              item.timestamp || index
                            }`} // Better unique key
                            sx={{
                              mb: 1,
                              pb: 1,
                              borderBottom:
                                index !== history.length - 1
                                  ? '1px solid rgba(0,0,0,0.05)'
                                  : 'none',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ display: 'flex', alignItems: 'center' }}
                            >
                              <AccessTime
                                sx={{
                                  fontSize: '0.9rem',
                                  mr: 0.5,
                                  color: '#F4A7B9',
                                }}
                              />
                              {item.action} by {item.user?.name || 'Unknown'}
                              {item.timestamp && (
                                <Typography
                                  component="span"
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ ml: 1 }}
                                >
                                  {format(
                                    new Date(item.timestamp),
                                    "MMM d, yyyy 'at' h:mm a",
                                  )}
                                </Typography>
                              )}
                            </Typography>
                            {item.note && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ pl: 3 }}
                              >
                                "{item.note}"
                              </Typography>
                            )}
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No activity recorded
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}

                {activeTab === 1 && (
                  // Comments Tab
                  <TaskComments
                    comments={comments}
                    loading={commentsLoading}
                    onAddComment={addComment}
                    onUpdateComment={updateComment}
                    onDeleteComment={deleteComment}
                    commentContent={commentContent}
                    setCommentContent={setCommentContent}
                    saving={saving}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDetails}
            variant="outlined"
            sx={{
              borderColor: '#ccc',
              color: '#666',
              '&:hover': {
                borderColor: '#999',
                backgroundColor: 'rgba(0,0,0,0.03)',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth>
        <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
          Edit Task
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<SaveAlt />}
            onClick={handleEditSave}
            disabled={saving}
            sx={{
              backgroundColor: '#F4A7B9',
              '&:hover': {
                backgroundColor: '#ec8ca1',
              },
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign User Dialog */}
      <Dialog open={assignDialogOpen} onClose={handleAssignClose} fullWidth>
        <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
          Assign Task
        </DialogTitle>
        <DialogContent>
          {usersLoading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress size={24} sx={{ color: '#F4A7B9' }} />
            </Box>
          ) : (
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="user-select-label">User</InputLabel>
              <Select
                labelId="user-select-label"
                id="user-select"
                value={selectedUser || ''}
                onChange={(e) => setSelectedUser(e.target.value)}
                label="User"
              >
                <MenuItem value="">
                  <em>Unassigned</em>
                </MenuItem>
                {teamUsers.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          fontSize: '0.7rem',
                          bgcolor: '#F4A7B9',
                        }}
                      >
                        {user.name?.charAt(0)}
                      </Avatar>
                      {user.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAssignClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAssignSave}
            disabled={saving || usersLoading}
            sx={{
              backgroundColor: '#F4A7B9',
              '&:hover': {
                backgroundColor: '#ec8ca1',
              },
            }}
          >
            {saving ? 'Saving...' : 'Assign'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Label Dialog */}
      <Dialog open={labelDialogOpen} onClose={handleLabelClose} fullWidth>
        <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
          Add Label
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Label Name"
            value={newLabel.name}
            onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
            sx={{ mt: 1 }}
          />
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Color
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {[
                '#F4A7B9',
                '#90caf9',
                '#a5d6a7',
                '#ffcc80',
                '#e1bee7',
                '#81d4fa',
                '#c5e1a5',
                '#fff176',
              ].map((color) => (
                <Box
                  key={color}
                  onClick={() => setNewLabel({ ...newLabel, color })}
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: color,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border:
                      newLabel.color === color ? '2px solid #333' : 'none',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLabelClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleLabelSave}
            disabled={!newLabel.name.trim() || saving}
            sx={{
              backgroundColor: '#F4A7B9',
              '&:hover': {
                backgroundColor: '#ec8ca1',
              },
            }}
          >
            {saving ? 'Saving...' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
          Delete Task
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
            disabled={saving}
          >
            {saving ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbars */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
