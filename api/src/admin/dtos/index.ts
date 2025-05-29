import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsIn,
  IsDateString,
} from 'class-validator';

export class CreateUserAdminDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}

export class UpdateUserAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}

export class CreateTeamAdminDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTeamAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateProjectAdminDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  teamId: number;
}

export class UpdateProjectAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  teamId?: number;
}

export class CreateSprintAdminDto {
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  projectId: number;
}

export class UpdateSprintAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  projectId?: number;
}

export class CreateBoardAdminDto {
  @IsString()
  name: string;

  @IsNumber()
  sprintId: number;
}

export class UpdateBoardAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  sprintId?: number;
}

export class CreateBoardColumnAdminDto {
  @IsIn(['ready', 'in-progress', 'in-review', 'in-testing', 'ready-for-prod'])
  name: 'ready' | 'in-progress' | 'in-review' | 'in-testing' | 'ready-for-prod';

  @IsNumber()
  position: number;

  @IsNumber()
  boardId: number;
}

export class UpdateBoardColumnAdminDto {
  @IsOptional()
  @IsIn(['ready', 'in-progress', 'in-review', 'in-testing', 'ready-for-prod'])
  name?:
    | 'ready'
    | 'in-progress'
    | 'in-review'
    | 'in-testing'
    | 'ready-for-prod';

  @IsOptional()
  @IsNumber()
  position?: number;

  @IsOptional()
  @IsNumber()
  boardId?: number;
}

export class CreateTaskAdminDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  projectId: number;

  @IsOptional()
  @IsNumber()
  sprintId?: number;

  @IsNumber()
  boardColumnId: number;

  @IsOptional()
  @IsNumber()
  assignedUserId?: number;

  @IsNumber()
  createdById: number;
}

export class UpdateTaskAdminDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  projectId?: number;

  @IsOptional()
  @IsNumber()
  sprintId?: number;

  @IsOptional()
  @IsNumber()
  boardColumnId?: number;

  @IsOptional()
  @IsNumber()
  assignedUserId?: number;

  @IsOptional()
  @IsNumber()
  createdById?: number;
}

export class CreateLabelAdminDto {
  @IsString()
  name: string;

  @IsString()
  color: string;
}

export class UpdateLabelAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;
}

export class CreateCommentAdminDto {
  @IsString()
  content: string;

  @IsNumber()
  taskId: number;

  @IsNumber()
  authorId: number;
}

export class UpdateCommentAdminDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  taskId?: number;

  @IsOptional()
  @IsNumber()
  authorId?: number;
}

export class CreateTeamInviteAdminDto {
  @IsNumber()
  teamId: number;

  @IsNumber()
  invitedUserId: number;

  @IsNumber()
  invitedById: number;

  @IsOptional()
  @IsBoolean()
  accepted?: boolean;
}

export class UpdateTeamInviteAdminDto {
  @IsOptional()
  @IsNumber()
  teamId?: number;

  @IsOptional()
  @IsNumber()
  invitedUserId?: number;

  @IsOptional()
  @IsNumber()
  invitedById?: number;

  @IsOptional()
  @IsBoolean()
  accepted?: boolean;
}

export class CreateTaskLabelAdminDto {
  @IsNumber()
  taskId: number;

  @IsNumber()
  labelId: number;
}
