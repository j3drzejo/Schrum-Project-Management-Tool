import { Box, Typography, Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useBoardViewModel } from '../../viewModels/boardViewModel';
import BoardHeader from './BoardHeader';
import BoardColumns from './BoardColumns';
import SprintDialog from './SprintDialog';
import TaskDialog from './TaskDialog';
import LoadingOverlay from './LoadingOverlay';
import NotificationSnackbars from '../common/NotificationSnackbars';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import NoProjectSelected from './NoProjectSelected';

const DRAG_ACTIVATION_DISTANCE = 8;

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

  if (!currentSprint) {
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
  }

  return (
    <>
      <BoardHeader
        board={board}
        currentSprint={currentSprint}
        tasks={tasks}
        onEndSprint={handleEndSprint}
        endSprintLoading={endSprintLoading}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <BoardColumns
          columns={sortedColumns}
          tasks={tasks}
          onAddTask={handleAddTask}
        />
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

      <NotificationSnackbars
        successMessage={successMessage}
        errorMessage={errorMessage}
        onCloseSuccess={handleCloseSnackbar(setSuccessMessage)}
        onCloseError={handleCloseSnackbar(setErrorMessage)}
      />
    </>
  );
}
