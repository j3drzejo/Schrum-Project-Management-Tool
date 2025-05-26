export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  teamId?: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  teamId?: number;
}
