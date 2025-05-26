export interface CreateSprintDto {
  name: string;
  startDate: string;
  endDate: string;
}

export interface UpdateSprintDto {
  name?: string;
  startDate?: string;
  endDate?: string;
}
