import { useMemo, useCallback } from 'react';
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import { Add, PlayArrow, SaveAlt } from '@mui/icons-material';
import Task from '../task/Task';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useBoardViewModel } from '../../viewModels/boardViewModel';

const DRAG_ACTIVATION_DISTANCE = 8;
const SNACKBAR_DURATION = 3000;
const ERROR_SNACKBAR_DURATION = 5000;

function DraggableTask({ id, columnId }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `task-${id}`,
      data: { type: 'task', taskId: id, columnId },
    });

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      marginBottom: 8,
      opacity: isDragging ? 0.5 : 1,
      cursor: isDragging ? 'grabbing' : 'grab',
    }),
    [transform, isDragging],
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task id={id} />
    </div>
  );
}

function DroppableColumn({ column, tasks, onAddTask }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${column.id}`,
    data: { type: 'column', columnId: column.id },
  });

  const columnTasks = useMemo(
    () => tasks.filter((task) => task.boardColumn?.id === column.id),
    [tasks, column.id],
  );

  const columnStyles = useMemo(
    () => ({
      width: 280,
      minHeight: 500,
      maxHeight: '70vh',
      p: 2,
      backgroundColor: isOver ? 'rgba(244,167,185,0.1)' : 'rgba(0,0,0,0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      border: isOver ? '2px dashed #F4A7B9' : '2px solid transparent',
      transition: 'all 0.2s ease',
    }),
    [isOver],
  );

  const scrollStyles = useMemo(
    () => ({
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      '&::-webkit-scrollbar': { width: '6px' },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(244,167,185,0.5)',
        borderRadius: '3px',
      },
    }),
    [],
  );

  const handleAddTask = useCallback(
    () => onAddTask(column.id),
    [onAddTask, column.id],
  );

  const columnName = (name) => {
    if (name === 'ready') {
      return 'Ready';
    } else if (name === 'in-progress') {
      return 'In Progress';
    } else if (name === 'in-review') {
      return 'In Review';
    } else if (name === 'in-testing') {
      return 'In Testing';
    } else if (name === 'ready-for-prod') {
      return 'In Prod';
    }
  };

  return (
    <Paper ref={setNodeRef} elevation={3} sx={columnStyles}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            fontSize: '1rem',
          }}
        >
          {columnName(column.name)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{
              backgroundColor: 'rgba(244,167,185,0.2)',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold',
              color: '#666',
            }}
          >
            {columnTasks.length}
          </Typography>
          <Button
            size="small"
            onClick={handleAddTask}
            sx={{
              minWidth: 'auto',
              p: 0.5,
              color: '#F4A7B9',
              '&:hover': { backgroundColor: 'rgba(244,167,185,0.1)' },
            }}
          >
            <Add fontSize="small" />
          </Button>
        </Box>
      </Box>

      <Box sx={scrollStyles}>
        {columnTasks.map((task) => (
          <DraggableTask key={task.id} id={task.id} columnId={column.id} />
        ))}

        {columnTasks.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100px',
              color: '#999',
              fontStyle: 'italic',
              textAlign: 'center',
              border: '2px dashed rgba(0,0,0,0.1)',
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography variant="body2">
              Drop tasks here or click + to add
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

function LoadingSpinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
    >
      <CircularProgress size={40} sx={{ color: '#F4A7B9' }} />
    </Box>
  );
}

function ErrorAlert({ error }) {
  return (
    <Box p={4}>
      <Alert
        severity="error"
        sx={{
          maxWidth: 600,
          mx: 'auto',
          '& .MuiAlert-icon': { color: '#F4A7B9' },
        }}
      >
        {error}
      </Alert>
    </Box>
  );
}

function NoProjectSelected() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="400px"
      p={4}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Please select a project to view the board
      </Typography>
    </Box>
  );
}

function SprintDialog({
  open,
  onClose,
  sprintName,
  setSprintName,
  sprintStartDate,
  setSprintStartDate,
  sprintEndDate,
  setSprintEndDate,
  onCreateSprint,
  loading,
}) {
  const isFormValid = sprintName.trim() && sprintStartDate && sprintEndDate;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
        Create New Sprint
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Sprint Name"
          value={sprintName}
          onChange={(e) => setSprintName(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={sprintStartDate}
          onChange={(e) => setSprintStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={sprintEndDate}
          onChange={(e) => setSprintEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onCreateSprint}
          disabled={loading || !isFormValid}
          sx={{
            backgroundColor: '#F4A7B9',
            '&:hover': { backgroundColor: '#ec8ca1' },
          }}
        >
          {loading ? 'Creating...' : 'Create Sprint'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function TaskDialog({
  open,
  onClose,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  taskAssigneeId,
  setTaskAssigneeId,
  teamUsers,
  selectedColumnId,
  board,
  onCreateTask,
  loading,
}) {
  const selectedColumn = useMemo(
    () => board?.columns?.find((col) => col.id === selectedColumnId),
    [board, selectedColumnId],
  );

  const isFormValid = taskTitle.trim() && selectedColumnId;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: '#F4A7B9', fontWeight: 'bold' }}>
        Create New Task
        {selectedColumn && (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            in {selectedColumn.name}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Task Title *"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
          error={!taskTitle.trim() && taskTitle.length > 0}
          helperText={
            !taskTitle.trim() && taskTitle.length > 0 ? 'Title is required' : ''
          }
        />

        <TextField
          fullWidth
          label="Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          multiline
          rows={4}
          sx={{ mb: 2 }}
          placeholder="Describe what needs to be done..."
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="assignee-select-label">
            Assign to (Optional)
          </InputLabel>
          <Select
            labelId="assignee-select-label"
            value={taskAssigneeId}
            onChange={(e) => setTaskAssigneeId(e.target.value)}
            label="Assign to (Optional)"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveAlt />}
          onClick={onCreateTask}
          disabled={loading || !isFormValid}
          sx={{
            backgroundColor: '#F4A7B9',
            '&:hover': { backgroundColor: '#ec8ca1' },
          }}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function LoadingOverlay({ message }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          p: 3,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <CircularProgress size={24} sx={{ color: '#F4A7B9' }} />
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
}

export default function Board() {
  const viewModel = useBoardViewModel();

  const {
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
    errorMessage,
    setErrorMessage,
    setSuccessMessage,

    handleDragEnd,
    handleCreateSprint,
    handleEndSprint,
    handleOpenSprintDialog,
    handleAddTask,
    handleCloseTaskDialog,
    handleCreateTask,
    handleCloseSnackbar,
  } = viewModel;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: DRAG_ACTIVATION_DISTANCE },
    }),
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert error={error} />;
  if (!activeProject) return <NoProjectSelected />;
  if (!currentSprint)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        p={4}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: '#333', fontWeight: 'bold' }}
        >
          No Active Sprint
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Start a new sprint to begin organizing tasks on the board
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
          onClick={handleOpenSprintDialog}
          sx={{
            backgroundColor: '#F4A7B9',
            color: 'white',
            px: 4,
            py: 1.5,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#ec8ca1',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Start Sprint
        </Button>
        <SprintDialog
          open={sprintDialogOpen}
          onClose={() => setSprintDialogOpen(false)}
          sprintName={sprintName}
          setSprintName={setSprintName}
          sprintStartDate={sprintStartDate}
          setSprintStartDate={setSprintStartDate}
          sprintEndDate={sprintEndDate}
          setSprintEndDate={setSprintEndDate}
          onCreateSprint={handleCreateSprint}
          loading={createSprintLoading}
        />
      </Box>
    );

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ color: '#333', fontWeight: 'bold', mb: 1 }}
            >
              {board?.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Sprint: {currentSprint.name} • {tasks.length} tasks
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="large"
            onClick={handleEndSprint}
            disabled={endSprintLoading}
            sx={{
              borderColor: '#F4A7B9',
              color: '#F4A7B9',
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold',
              minWidth: 140,
              '&:hover': {
                borderColor: '#ec8ca1',
                backgroundColor: 'rgba(244,167,185,0.05)',
              },
              '&:disabled': {
                borderColor: 'rgba(244,167,185,0.3)',
                color: 'rgba(244,167,185,0.3)',
              },
            }}
          >
            {endSprintLoading ? (
              <>
                <CircularProgress size={16} sx={{ color: '#F4A7B9', mr: 1 }} />
                Ending...
              </>
            ) : (
              'End Sprint'
            )}
          </Button>
        </Box>
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            minHeight: '500px',
            '&::-webkit-scrollbar': { height: '8px' },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(244,167,185,0.5)',
              borderRadius: '4px',
            },
          }}
        >
          {sortedColumns.map((column) => (
            <DroppableColumn
              key={column.id}
              column={column}
              tasks={tasks}
              onAddTask={handleAddTask}
            />
          ))}
        </Box>
      </DndContext>

      {movingTask && <LoadingOverlay message="Moving task..." />}

      <SprintDialog
        open={sprintDialogOpen}
        onClose={() => setSprintDialogOpen(false)}
        sprintName={sprintName}
        setSprintName={setSprintName}
        sprintStartDate={sprintStartDate}
        setSprintStartDate={setSprintStartDate}
        sprintEndDate={sprintEndDate}
        setSprintEndDate={setSprintEndDate}
        onCreateSprint={handleCreateSprint}
        loading={createSprintLoading}
      />

      <TaskDialog
        open={taskDialogOpen}
        onClose={handleCloseTaskDialog}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        taskAssigneeId={taskAssigneeId}
        setTaskAssigneeId={setTaskAssigneeId}
        teamUsers={teamUsers}
        selectedColumnId={selectedColumnId}
        board={board}
        onCreateTask={handleCreateTask}
        loading={createTaskLoading}
      />

      <Snackbar
        open={!!successMessage}
        autoHideDuration={SNACKBAR_DURATION}
        onClose={handleCloseSnackbar(setSuccessMessage)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{ width: '100%' }}
          onClose={handleCloseSnackbar(setSuccessMessage)}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={ERROR_SNACKBAR_DURATION}
        onClose={handleCloseSnackbar(setErrorMessage)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          sx={{ width: '100%' }}
          onClose={handleCloseSnackbar(setErrorMessage)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
