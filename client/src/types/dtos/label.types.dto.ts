export interface CreateLabelDto {
  name: string;
  color: string;
}

export interface UpdateLabelDto {
  name?: string;
  color?: string;
}

export interface AddLabelToTaskDto {
  labelId?: number;
}
