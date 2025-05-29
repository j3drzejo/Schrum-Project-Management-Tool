import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsIn,
  IsDateString,
} from 'class-validator';
import { AuthenticatedRequest } from 'src/types';
import { AdminService } from './admin.service';
import { Public } from 'src/auth/public.decorator';

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

@Public()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  isAdmin(@Req() req: AuthenticatedRequest) {
    return req.user?.isAdmin;
  }

  // User Management
  @Get('users')
  async getAllUsers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllUsers(page, limit);
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getUserById(id);
  }

  @Post('users')
  async createUser(@Body() createUserAdminDto: CreateUserAdminDto) {
    return this.adminService.createUser(createUserAdminDto);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserAdminDto: UpdateUserAdminDto,
  ) {
    return this.adminService.updateUser(id, updateUserAdminDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  // Team Management
  @Get('teams')
  async getAllTeams(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllTeams(page, limit);
  }

  @Get('teams/:id')
  async getTeamById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getTeamById(id);
  }

  @Post('teams')
  async createTeam(@Body() createTeamAdminDto: CreateTeamAdminDto) {
    console.log('here');
    return this.adminService.createTeam(createTeamAdminDto);
  }

  @Put('teams/:id')
  async updateTeam(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamAdminDto: UpdateTeamAdminDto,
  ) {
    return this.adminService.updateTeam(id, updateTeamAdminDto);
  }

  @Delete('teams/:id')
  async deleteTeam(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteTeam(id);
  }

  // Project Management
  @Get('projects')
  async getAllProjects(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllProjects(page, limit);
  }

  @Get('projects/:id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getProjectById(id);
  }

  @Post('projects')
  async createProject(@Body() createProjectAdminDto: CreateProjectAdminDto) {
    return this.adminService.createProject(createProjectAdminDto);
  }

  @Put('projects/:id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectAdminDto: UpdateProjectAdminDto,
  ) {
    return this.adminService.updateProject(id, updateProjectAdminDto);
  }

  @Delete('projects/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteProject(id);
  }

  // Sprint Management
  @Get('sprints')
  async getAllSprints(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllSprints(page, limit);
  }

  @Get('sprints/:id')
  async getSprintById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getSprintById(id);
  }

  @Post('sprints')
  async createSprint(@Body() createSprintAdminDto: CreateSprintAdminDto) {
    return this.adminService.createSprint(createSprintAdminDto);
  }

  @Put('sprints/:id')
  async updateSprint(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSprintAdminDto: UpdateSprintAdminDto,
  ) {
    return this.adminService.updateSprint(id, updateSprintAdminDto);
  }

  @Delete('sprints/:id')
  async deleteSprint(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteSprint(id);
  }

  // Board Management
  @Get('boards')
  async getAllBoards(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllBoards(page, limit);
  }

  @Get('boards/:id')
  async getBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getBoardById(id);
  }

  @Post('boards')
  async createBoard(@Body() createBoardAdminDto: CreateBoardAdminDto) {
    return this.adminService.createBoard(createBoardAdminDto);
  }

  @Put('boards/:id')
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardAdminDto: UpdateBoardAdminDto,
  ) {
    return this.adminService.updateBoard(id, updateBoardAdminDto);
  }

  @Delete('boards/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteBoard(id);
  }

  // Board Column Management
  @Get('board-columns')
  async getAllBoardColumns(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllBoardColumns(page, limit);
  }

  @Get('board-columns/:id')
  async getBoardColumnById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getBoardColumnById(id);
  }

  @Post('board-columns')
  async createBoardColumn(
    @Body() createBoardColumnAdminDto: CreateBoardColumnAdminDto,
  ) {
    return this.adminService.createBoardColumn(createBoardColumnAdminDto);
  }

  @Put('board-columns/:id')
  async updateBoardColumn(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardColumnAdminDto: UpdateBoardColumnAdminDto,
  ) {
    return this.adminService.updateBoardColumn(id, updateBoardColumnAdminDto);
  }

  @Delete('board-columns/:id')
  async deleteBoardColumn(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteBoardColumn(id);
  }

  // Task Management
  @Get('tasks')
  async getAllTasks(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllTasks(page, limit);
  }

  @Get('tasks/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getTaskById(id);
  }

  @Post('tasks')
  async createTask(@Body() createTaskAdminDto: CreateTaskAdminDto) {
    return this.adminService.createTask(createTaskAdminDto);
  }

  @Put('tasks/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskAdminDto: UpdateTaskAdminDto,
  ) {
    return this.adminService.updateTask(id, updateTaskAdminDto);
  }

  @Delete('tasks/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteTask(id);
  }

  // Label Management
  @Get('labels')
  async getAllLabels(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllLabels(page, limit);
  }

  @Get('labels/:id')
  async getLabelById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getLabelById(id);
  }

  @Post('labels')
  async createLabel(@Body() createLabelAdminDto: CreateLabelAdminDto) {
    return this.adminService.createLabel(createLabelAdminDto);
  }

  @Put('labels/:id')
  async updateLabel(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLabelAdminDto: UpdateLabelAdminDto,
  ) {
    return this.adminService.updateLabel(id, updateLabelAdminDto);
  }

  @Delete('labels/:id')
  async deleteLabel(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteLabel(id);
  }

  // Comment Management
  @Get('comments')
  async getAllComments(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllComments(page, limit);
  }

  @Get('comments/:id')
  async getCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getCommentById(id);
  }

  @Post('comments')
  async createComment(@Body() createCommentAdminDto: CreateCommentAdminDto) {
    return this.adminService.createComment(createCommentAdminDto);
  }

  @Put('comments/:id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentAdminDto: UpdateCommentAdminDto,
  ) {
    return this.adminService.updateComment(id, updateCommentAdminDto);
  }

  @Delete('comments/:id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteComment(id);
  }

  // Team Invite Management
  @Get('team-invites')
  async getAllTeamInvites(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllTeamInvites(page, limit);
  }

  @Get('team-invites/:id')
  async getTeamInviteById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getTeamInviteById(id);
  }

  @Post('team-invites')
  async createTeamInvite(
    @Body() createTeamInviteAdminDto: CreateTeamInviteAdminDto,
  ) {
    return this.adminService.createTeamInvite(createTeamInviteAdminDto);
  }

  @Put('team-invites/:id')
  async updateTeamInvite(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamInviteAdminDto: UpdateTeamInviteAdminDto,
  ) {
    return this.adminService.updateTeamInvite(id, updateTeamInviteAdminDto);
  }

  @Delete('team-invites/:id')
  async deleteTeamInvite(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteTeamInvite(id);
  }

  // Task Label Management
  @Get('task-labels')
  async getAllTaskLabels(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getAllTaskLabels(page, limit);
  }

  @Get('task-labels/:taskId/:labelId')
  async getTaskLabel(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ) {
    return this.adminService.getTaskLabel(taskId, labelId);
  }

  @Post('task-labels')
  async createTaskLabel(
    @Body() createTaskLabelAdminDto: CreateTaskLabelAdminDto,
  ) {
    return this.adminService.createTaskLabel(createTaskLabelAdminDto);
  }

  @Delete('task-labels/:taskId/:labelId')
  async deleteTaskLabel(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ) {
    return this.adminService.deleteTaskLabel(taskId, labelId);
  }

  // System Statistics
  @Get('stats')
  async getSystemStats() {
    return this.adminService.getSystemStats();
  }
}
