import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from '@mui/material';
import {
  Send,
  MoreVert,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

export default function TaskComments({
  comments,
  loading: commentsLoading,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  commentContent,
  setCommentContent,
  saving,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const handleMenuOpen = (event, commentId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    const comment = comments.find((c) => c.id === selectedCommentId);
    if (comment) {
      setEditCommentContent(comment.content);
      setEditingCommentId(selectedCommentId);
      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditCommentContent('');
    setEditingCommentId(null);
    setSelectedCommentId(null);
  };

  const handleEditSave = async () => {
    if (editCommentContent.trim() && editingCommentId) {
      console.log('Saving edited comment:', editCommentContent);
      console.log('Comment ID:', editingCommentId);
      await onUpdateComment(editingCommentId, editCommentContent);
      handleEditClose();
    }
  };

  const handleDeleteOpen = () => {
    setDeletingCommentId(selectedCommentId);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setDeletingCommentId(null);
    setSelectedCommentId(null);
  };

  const handleDeleteConfirm = async () => {
    if (deletingCommentId) {
      await onDeleteComment(deletingCommentId);
      handleDeleteClose();
    }
  };

  const handleSubmitComment = async () => {
    if (commentContent.trim()) {
      await onAddComment(commentContent);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        color="#666"
        gutterBottom
      >
        Comments
      </Typography>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'rgba(244,167,185,0.05)',
          p: 2,
          borderRadius: 2,
          mb: 2,
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {commentsLoading ? (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress size={20} sx={{ color: '#F4A7B9' }} />
          </Box>
        ) : comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <Box
              key={comment.id || index}
              sx={{
                mb: 2,
                pb: 2,
                borderBottom:
                  index !== comments.length - 1
                    ? '1px solid rgba(0,0,0,0.06)'
                    : 'none',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      mr: 1.5,
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      color: '#fff',
                      background: 'linear-gradient(45deg, #F4A7B9, #ec8ca1)',
                    }}
                  >
                    {comment.author?.name?.charAt(0) || '?'}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {comment.author?.name || 'Unknown User'}
                      </Typography>
                      {comment.createdAt && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {format(
                            new Date(comment.createdAt),
                            "MMM d, yyyy 'at' h:mm a",
                          )}
                        </Typography>
                      )}
                      {comment.updatedAt &&
                        comment.updatedAt !== comment.createdAt && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ ml: 1, fontStyle: 'italic' }}
                          >
                            (edited)
                          </Typography>
                        )}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}
                    >
                      {comment.content}
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, comment.id)}
                  sx={{ color: '#999' }}
                >
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            py={2}
          >
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </Paper>

      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a comment..."
          multiline
          minRows={1}
          maxRows={4}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: '#fff',
              '&:hover fieldset': {
                borderColor: '#F4A7B9',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#F4A7B9',
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={handleSubmitComment}
          disabled={!commentContent.trim() || saving}
          sx={{
            ml: 1,
            borderRadius: '20px',
            backgroundColor: '#F4A7B9',
            '&:hover': {
              backgroundColor: '#ec8ca1',
            },
            height: 'fit-content',
            alignSelf: 'flex-end',
          }}
        >
          {saving ? 'Sending...' : 'Send'}
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEditOpen}>
          <EditIcon fontSize="small" sx={{ mr: 1, color: '#F4A7B9' }} />
          Edit
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDeleteOpen} sx={{ color: '#e57373' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth>
        <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
          Edit Comment
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={4}
            value={editCommentContent}
            onChange={(e) => setEditCommentContent(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleEditSave}
            disabled={!editCommentContent.trim() || saving}
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

      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
          Delete Comment
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this comment? This action cannot be
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
            {saving ? 'Deleting..' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
