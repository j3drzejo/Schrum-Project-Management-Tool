import { useMemo, useCallback } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDroppable } from '@dnd-kit/core';
import DraggableTask from './DraggableTask';
import { getColumnDisplayName } from '../../utils/columnUtils';

export default function DroppableColumn({ column, tasks, onAddTask }) {
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
          {getColumnDisplayName(column.name)}
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
