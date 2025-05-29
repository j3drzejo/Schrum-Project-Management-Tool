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
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/types';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import {
  CreateUserAdminDto,
  UpdateUserAdminDto,
  CreateTeamAdminDto,
  UpdateTeamAdminDto,
  CreateBoardAdminDto,
  UpdateBoardAdminDto,
  CreateCommentAdminDto,
  UpdateCommentAdminDto,
  CreateLabelAdminDto,
  UpdateLabelAdminDto,
  CreateProjectAdminDto,
  UpdateProjectAdminDto,
  CreateSprintAdminDto,
  UpdateSprintAdminDto,
  CreateTaskAdminDto,
  UpdateTaskAdminDto,
  CreateBoardColumnAdminDto,
  UpdateBoardColumnAdminDto,
  CreateTeamInviteAdminDto,
  UpdateTeamInviteAdminDto,
  CreateTaskLabelAdminDto,
} from './dtos';

@UseGuards(AdminGuard)
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
