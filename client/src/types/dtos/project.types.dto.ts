export interface CreateProjectDto {
  name: string;
  description?: string;
  teamId: number;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}
