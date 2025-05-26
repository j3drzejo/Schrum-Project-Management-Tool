import { useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Task from '../task/Task';

export default function DraggableTask({ id, columnId }) {
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
