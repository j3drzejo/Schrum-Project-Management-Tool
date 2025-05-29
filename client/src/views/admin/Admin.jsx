import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  CircularProgress,
  Pagination,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Chip,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import { useAdminViewModel } from '../../viewModels/adminViewModel';

const AdminDashboard = () => {
  const {
    activeTab,
    loading,
    error,
    stats,
    data,
    page,
    showModal,
    modalMode,
    selectedItem,
    formData,
    totalPages,
    handleTabChange,
    handlePageChange,
    openModal,
    closeModal,
    handleDelete,
    handleSubmit,
    updateFormData,
    setError,
  } = useAdminViewModel();

  const tabs = [
    { id: 'stats', label: 'Statistics', icon: BarChartIcon },
    { id: 'users', label: 'Users' },
    { id: 'teams', label: 'Teams' },
    { id: 'projects', label: 'Projects' },
    { id: 'sprints', label: 'Sprints' },
    { id: 'boards', label: 'Boards' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'labels', label: 'Labels' },
    { id: 'comments', label: 'Comments' },
  ];

  const renderFormFields = () => {
    switch (activeTab) {
      case 'users':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
              />
            </Grid>
            {modalMode === 'create' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  required
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isAdmin || false}
                    onChange={(e) =>
                      updateFormData('isAdmin', e.target.checked)
                    }
                  />
                }
                label="Is Admin"
              />
            </Grid>
          </Grid>
        );

      case 'teams':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 'projects':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Team ID"
                type="number"
                value={formData.teamId || ''}
                onChange={(e) =>
                  updateFormData('teamId', parseInt(e.target.value))
                }
                required
              />
            </Grid>
          </Grid>
        );

      case 'sprints':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={formData.startDate || ''}
                onChange={(e) => updateFormData('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => updateFormData('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project ID"
                type="number"
                value={formData.projectId || ''}
                onChange={(e) =>
                  updateFormData('projectId', parseInt(e.target.value))
                }
                required
              />
            </Grid>
          </Grid>
        );

      case 'labels':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Color"
                type="color"
                value={formData.color || '#000000'}
                onChange={(e) => updateFormData('color', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        );

      case 'boards':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sprint ID"
                type="number"
                value={formData.sprintId || ''}
                onChange={(e) =>
                  updateFormData('sprintId', parseInt(e.target.value))
                }
                required
              />
            </Grid>
          </Grid>
        );

      case 'tasks':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title || ''}
                onChange={(e) => updateFormData('title', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Project ID"
                type="number"
                value={formData.projectId || ''}
                onChange={(e) =>
                  updateFormData('projectId', parseInt(e.target.value))
                }
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Sprint ID (Optional)"
                type="number"
                value={formData.sprintId || ''}
                onChange={(e) =>
                  updateFormData(
                    'sprintId',
                    e.target.value ? parseInt(e.target.value) : null,
                  )
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Board Column ID"
                type="number"
                value={formData.boardColumnId || ''}
                onChange={(e) =>
                  updateFormData('boardColumnId', parseInt(e.target.value))
                }
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Assigned User ID (Optional)"
                type="number"
                value={formData.assignedUserId || ''}
                onChange={(e) =>
                  updateFormData(
                    'assignedUserId',
                    e.target.value ? parseInt(e.target.value) : null,
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Created By User ID"
                type="number"
                value={formData.createdById || ''}
                onChange={(e) =>
                  updateFormData('createdById', parseInt(e.target.value))
                }
                required
              />
            </Grid>
          </Grid>
        );

      case 'comments':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                multiline
                rows={4}
                value={formData.content || ''}
                onChange={(e) => updateFormData('content', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Task ID"
                type="number"
                value={formData.taskId || ''}
                onChange={(e) =>
                  updateFormData('taskId', parseInt(e.target.value))
                }
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Author ID"
                type="number"
                value={formData.authorId || ''}
                onChange={(e) =>
                  updateFormData('authorId', parseInt(e.target.value))
                }
                required
              />
            </Grid>
          </Grid>
        );

      default:
        return (
          <Typography color="textSecondary">
            Form fields for {activeTab} are not yet implemented. You can extend
            this component to add specific forms for each entity type.
          </Typography>
        );
    }
  };

  const renderTableHeader = () => {
    switch (activeTab) {
      case 'users':
        return (
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        );
      case 'teams':
        return (
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        );
      case 'labels':
        return (
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        );
      default:
        return (
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        );
    }
  };

  const renderTableRow = (item, index) => {
    const actionButtons = (
      <Box>
        <IconButton
          onClick={() => openModal('view', item)}
          color="primary"
          size="small"
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          onClick={() => openModal('edit', item)}
          color="warning"
          size="small"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(item.id)}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );

    switch (activeTab) {
      case 'users':
        return (
          <TableRow key={item.id || index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <Chip
                label={item.isAdmin ? 'Yes' : 'No'}
                color={item.isAdmin ? 'success' : 'default'}
                size="small"
              />
            </TableCell>
            <TableCell>{actionButtons}</TableCell>
          </TableRow>
        );
      case 'teams':
        return (
          <TableRow key={item.id || index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{actionButtons}</TableCell>
          </TableRow>
        );
      case 'labels':
        return (
          <TableRow key={item.id || index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Box display="flex" alignItems="center">
                <Box
                  width={24}
                  height={24}
                  borderRadius="50%"
                  mr={1}
                  border="1px solid #ccc"
                  style={{ backgroundColor: item.color }}
                />
                {item.color}
              </Box>
            </TableCell>
            <TableCell>{actionButtons}</TableCell>
          </TableRow>
        );
      default:
        return (
          <TableRow key={item.id || index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <pre style={{ fontSize: '0.75rem', margin: 0 }}>
                {JSON.stringify(item, null, 2)}
              </pre>
            </TableCell>
            <TableCell>{actionButtons}</TableCell>
          </TableRow>
        );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => handleTabChange(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  label={
                    <Box display="flex" alignItems="center">
                      {Icon && <Icon sx={{ mr: 1 }} />}
                      {tab.label}
                    </Box>
                  }
                />
              );
            })}
          </Tabs>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {activeTab === 'stats' && (
          <Grid container spacing={3}>
            {stats &&
              Object.entries(stats).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={3} key={key}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <BarChartIcon sx={{ mr: 2, color: 'text.secondary' }} />
                        <Box>
                          <Typography variant="h6" component="h2">
                            {value}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {key}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}

        {activeTab !== 'stats' && (
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              borderBottom="1px solid #e0e0e0"
            >
              <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                {activeTab.replace('-', ' ')}
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => openModal('create')}
              >
                Add New
              </Button>
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" p={8}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>{renderTableHeader()}</TableHead>
                    <TableBody>
                      {data.map((item, index) => renderTableRow(item, index))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {totalPages > 1 && (
                  <Box display="flex" justifyContent="center" p={3}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(e, newPage) => handlePageChange(newPage)}
                      color="primary"
                    />
                  </Box>
                )}
              </>
            )}
          </Paper>
        )}

        <Dialog open={showModal} onClose={closeModal} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ textTransform: 'capitalize' }}>
            {modalMode} {activeTab.replace('-', ' ')}
          </DialogTitle>
          <DialogContent>
            {modalMode === 'view' ? (
              <Box mt={2}>
                <pre
                  style={{
                    fontSize: '0.875rem',
                    backgroundColor: '#f5f5f5',
                    padding: '1rem',
                    borderRadius: '4px',
                    overflow: 'auto',
                  }}
                >
                  {JSON.stringify(selectedItem, null, 2)}
                </pre>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit} mt={2}>
                {renderFormFields()}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>
              {modalMode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {modalMode !== 'view' && (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
