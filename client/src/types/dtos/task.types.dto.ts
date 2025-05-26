export interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: number;
  sprintId?: number;
  boardColumnId: number;
  assignedUserId?: number;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  boardColumnId?: number;
  assignedUserId?: number;
  sprintId?: number;
}

export interface MoveTaskDto {
  columnId: number;
  note?: string;
}

export interface AssignUserDto {
  userId: number;
}
