import { Box } from '@mui/material';
import DroppableColumn from './DroppableColumn';

export default function BoardColumns({ columns, tasks, onAddTask }) {
  return (
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
      {columns.map((column) => (
        <DroppableColumn
          key={column.id}
          column={column}
          tasks={tasks}
          onAddTask={onAddTask}
        />
      ))}
    </Box>
  );
}
