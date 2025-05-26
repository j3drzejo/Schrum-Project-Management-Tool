export interface CreateTeamDto {
  name: string;
}

export interface UpdateTeamDto {
  name?: string;
}

export interface InviteUserDto {
  email: string;
}
