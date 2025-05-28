import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  User,
  Team,
  Project,
  Sprint,
  Board,
  BoardColumn,
  Task,
  Label,
  Comment,
  TeamInvite,
  TaskLabel,
} from 'src/typeORM';
import {
  CreateUserAdminDto,
  UpdateUserAdminDto,
  CreateTeamAdminDto,
  UpdateTeamAdminDto,
  CreateProjectAdminDto,
  UpdateProjectAdminDto,
  CreateSprintAdminDto,
  UpdateSprintAdminDto,
  CreateBoardAdminDto,
  UpdateBoardAdminDto,
  CreateBoardColumnAdminDto,
  UpdateBoardColumnAdminDto,
  CreateTaskAdminDto,
  UpdateTaskAdminDto,
  CreateLabelAdminDto,
  UpdateLabelAdminDto,
  CreateCommentAdminDto,
  UpdateCommentAdminDto,
  CreateTeamInviteAdminDto,
  UpdateTeamInviteAdminDto,
  CreateTaskLabelAdminDto,
} from './admin.controller';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(Sprint)
    private readonly sprintRepo: Repository<Sprint>,
    @InjectRepository(Board)
    private readonly boardRepo: Repository<Board>,
    @InjectRepository(BoardColumn)
    private readonly boardColumnRepo: Repository<BoardColumn>,
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(Label)
    private readonly labelRepo: Repository<Label>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(TeamInvite)
    private readonly teamInviteRepo: Repository<TeamInvite>,
    @InjectRepository(TaskLabel)
    private readonly taskLabelRepo: Repository<TaskLabel>,
  ) {}

  // User Management
  async getAllUsers(page = 1, limit = 10) {
    const [users, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['teams', 'assignedTasks', 'createdTasks'],
    });
    return { users, total, page, limit };
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: [
        'teams',
        'assignedTasks',
        'createdTasks',
        'comments',
        'histories',
      ],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(createUserAdminDto: CreateUserAdminDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: createUserAdminDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserAdminDto.password, 10);
    const user = this.userRepo.create({
      ...createUserAdminDto,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }

  async updateUser(id: number, updateUserAdminDto: UpdateUserAdminDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserAdminDto.email && updateUserAdminDto.email !== user.email) {
      const existingUser = await this.userRepo.findOne({
        where: { email: updateUserAdminDto.email },
      });
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }
    }

    if (updateUserAdminDto.password) {
      updateUserAdminDto.password = await bcrypt.hash(
        updateUserAdminDto.password,
        10,
      );
    }

    Object.assign(user, updateUserAdminDto);
    return this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepo.remove(user);
    return { message: 'User deleted successfully' };
  }

  async getAllTeams(page = 1, limit = 10) {
    const [teams, total] = await this.teamRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['users', 'projects'],
    });
    return { teams, total, page, limit };
  }

  async getTeamById(id: number) {
    const team = await this.teamRepo.findOne({
      where: { id },
      relations: ['users', 'projects', 'invites'],
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async createTeam(createTeamAdminDto: CreateTeamAdminDto) {
    const team = this.teamRepo.create(createTeamAdminDto);
    return this.teamRepo.save(team);
  }

  async updateTeam(id: number, updateTeamAdminDto: UpdateTeamAdminDto) {
    const team = await this.teamRepo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    Object.assign(team, updateTeamAdminDto);
    return this.teamRepo.save(team);
  }

  async deleteTeam(id: number) {
    const team = await this.teamRepo.findOneBy({ id });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    await this.teamRepo.remove(team);
    return { message: 'Team deleted successfully' };
  }

  // Project Management
  async getAllProjects(page = 1, limit = 10) {
    const [projects, total] = await this.projectRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['team', 'sprints', 'tasks'],
    });
    return { projects, total, page, limit };
  }

  async getProjectById(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['team', 'sprints', 'tasks'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async createProject(createProjectAdminDto: CreateProjectAdminDto) {
    const team = await this.teamRepo.findOneBy({
      id: createProjectAdminDto.teamId,
    });
    if (!team) {
      throw new NotFoundException(
        `Team with ID ${createProjectAdminDto.teamId} not found`,
      );
    }

    const project = this.projectRepo.create({
      ...createProjectAdminDto,
      team,
    });
    return this.projectRepo.save(project);
  }

  async updateProject(
    id: number,
    updateProjectAdminDto: UpdateProjectAdminDto,
  ) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (updateProjectAdminDto.teamId) {
      const team = await this.teamRepo.findOneBy({
        id: updateProjectAdminDto.teamId,
      });
      if (!team) {
        throw new NotFoundException(
          `Team with ID ${updateProjectAdminDto.teamId} not found`,
        );
      }
      project.team = team;
    }

    Object.assign(project, updateProjectAdminDto);
    return this.projectRepo.save(project);
  }

  async deleteProject(id: number) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    await this.projectRepo.remove(project);
    return { message: 'Project deleted successfully' };
  }

  // Sprint Management
  async getAllSprints(page = 1, limit = 10) {
    const [sprints, total] = await this.sprintRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['project', 'board', 'tasks'],
    });
    return { sprints, total, page, limit };
  }

  async getSprintById(id: number) {
    const sprint = await this.sprintRepo.findOne({
      where: { id },
      relations: ['project', 'board', 'tasks'],
    });
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }
    return sprint;
  }

  async createSprint(createSprintAdminDto: CreateSprintAdminDto) {
    const project = await this.projectRepo.findOneBy({
      id: createSprintAdminDto.projectId,
    });
    if (!project) {
      throw new NotFoundException(
        `Project with ID ${createSprintAdminDto.projectId} not found`,
      );
    }

    const sprint = this.sprintRepo.create({
      ...createSprintAdminDto,
      project,
    });
    return this.sprintRepo.save(sprint);
  }

  async updateSprint(id: number, updateSprintAdminDto: UpdateSprintAdminDto) {
    const sprint = await this.sprintRepo.findOneBy({ id });
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }

    if (updateSprintAdminDto.projectId) {
      const project = await this.projectRepo.findOneBy({
        id: updateSprintAdminDto.projectId,
      });
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${updateSprintAdminDto.projectId} not found`,
        );
      }
      sprint.project = project;
    }

    Object.assign(sprint, updateSprintAdminDto);
    return this.sprintRepo.save(sprint);
  }

  async deleteSprint(id: number) {
    const sprint = await this.sprintRepo.findOneBy({ id });
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${id} not found`);
    }
    await this.sprintRepo.remove(sprint);
    return { message: 'Sprint deleted successfully' };
  }

  // Board Management
  async getAllBoards(page = 1, limit = 10) {
    const [boards, total] = await this.boardRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['sprint', 'columns'],
    });
    return { boards, total, page, limit };
  }

  async getBoardById(id: number) {
    const board = await this.boardRepo.findOne({
      where: { id },
      relations: ['sprint', 'columns'],
    });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  async createBoard(createBoardAdminDto: CreateBoardAdminDto) {
    const sprint = await this.sprintRepo.findOneBy({
      id: createBoardAdminDto.sprintId,
    });
    if (!sprint) {
      throw new NotFoundException(
        `Sprint with ID ${createBoardAdminDto.sprintId} not found`,
      );
    }

    const board = this.boardRepo.create({
      ...createBoardAdminDto,
      sprint,
    });
    return this.boardRepo.save(board);
  }

  async updateBoard(id: number, updateBoardAdminDto: UpdateBoardAdminDto) {
    const board = await this.boardRepo.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    if (updateBoardAdminDto.sprintId) {
      const sprint = await this.sprintRepo.findOneBy({
        id: updateBoardAdminDto.sprintId,
      });
      if (!sprint) {
        throw new NotFoundException(
          `Sprint with ID ${updateBoardAdminDto.sprintId} not found`,
        );
      }
      board.sprint = sprint;
    }

    Object.assign(board, updateBoardAdminDto);
    return this.boardRepo.save(board);
  }

  async deleteBoard(id: number) {
    const board = await this.boardRepo.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    await this.boardRepo.remove(board);
    return { message: 'Board deleted successfully' };
  }

  // Board Column Management
  async getAllBoardColumns(page = 1, limit = 10) {
    const [columns, total] = await this.boardColumnRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['board'],
    });
    return { columns, total, page, limit };
  }

  async getBoardColumnById(id: number) {
    const column = await this.boardColumnRepo.findOne({
      where: { id },
      relations: ['board'],
    });
    if (!column) {
      throw new NotFoundException(`Board column with ID ${id} not found`);
    }
    return column;
  }

  async createBoardColumn(
    createBoardColumnAdminDto: CreateBoardColumnAdminDto,
  ) {
    const board = await this.boardRepo.findOneBy({
      id: createBoardColumnAdminDto.boardId,
    });
    if (!board) {
      throw new NotFoundException(
        `Board with ID ${createBoardColumnAdminDto.boardId} not found`,
      );
    }

    const column = this.boardColumnRepo.create({
      ...createBoardColumnAdminDto,
      board,
    });
    return this.boardColumnRepo.save(column);
  }

  async updateBoardColumn(
    id: number,
    updateBoardColumnAdminDto: UpdateBoardColumnAdminDto,
  ) {
    const column = await this.boardColumnRepo.findOneBy({ id });
    if (!column) {
      throw new NotFoundException(`Board column with ID ${id} not found`);
    }

    if (updateBoardColumnAdminDto.boardId) {
      const board = await this.boardRepo.findOneBy({
        id: updateBoardColumnAdminDto.boardId,
      });
      if (!board) {
        throw new NotFoundException(
          `Board with ID ${updateBoardColumnAdminDto.boardId} not found`,
        );
      }
      column.board = board;
    }

    Object.assign(column, updateBoardColumnAdminDto);
    return this.boardColumnRepo.save(column);
  }

  async deleteBoardColumn(id: number) {
    const column = await this.boardColumnRepo.findOneBy({ id });
    if (!column) {
      throw new NotFoundException(`Board column with ID ${id} not found`);
    }
    await this.boardColumnRepo.remove(column);
    return { message: 'Board column deleted successfully' };
  }

  // Task Management
  async getAllTasks(page = 1, limit = 10) {
    const [tasks, total] = await this.taskRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'project',
        'sprint',
        'boardColumn',
        'assignedUser',
        'createdBy',
        'comments',
        'labels',
      ],
    });
    return { tasks, total, page, limit };
  }

  async getTaskById(id: number) {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: [
        'project',
        'sprint',
        'boardColumn',
        'assignedUser',
        'createdBy',
        'comments',
        'labels',
        'history',
      ],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskAdminDto: CreateTaskAdminDto) {
    const project = await this.projectRepo.findOneBy({
      id: createTaskAdminDto.projectId,
    });
    if (!project) {
      throw new NotFoundException(
        `Project with ID ${createTaskAdminDto.projectId} not found`,
      );
    }

    const boardColumn = await this.boardColumnRepo.findOneBy({
      id: createTaskAdminDto.boardColumnId,
    });
    if (!boardColumn) {
      throw new NotFoundException(
        `Board column with ID ${createTaskAdminDto.boardColumnId} not found`,
      );
    }

    const createdBy = await this.userRepo.findOneBy({
      id: createTaskAdminDto.createdById,
    });
    if (!createdBy) {
      throw new NotFoundException(
        `User with ID ${createTaskAdminDto.createdById} not found`,
      );
    }

    let sprint = await this.sprintRepo.findOneBy({
      id: createTaskAdminDto.sprintId,
    });
    if (createTaskAdminDto.sprintId) {
      sprint = await this.sprintRepo.findOneBy({
        id: createTaskAdminDto.sprintId,
      });
      if (!sprint) {
        throw new NotFoundException(
          `Sprint with ID ${createTaskAdminDto.sprintId} not found`,
        );
      }
    }

    let assignedUser = await this.userRepo.findOneBy({
      id: createTaskAdminDto.assignedUserId,
    });
    if (createTaskAdminDto.assignedUserId) {
      assignedUser = await this.userRepo.findOneBy({
        id: createTaskAdminDto.assignedUserId,
      });
      if (!assignedUser) {
        throw new NotFoundException(
          `User with ID ${createTaskAdminDto.assignedUserId} not found`,
        );
      }
    }

    // const task = this.taskRepo.create({
    //   title: createTaskAdminDto.title,
    //   description: createTaskAdminDto.description,
    //   project,
    //   sprint,
    //   boardColumn,
    //   assignedUser,
    //   createdBy,
    // });
    // return this.taskRepo.save(task);
  }

  async updateTask(id: number, updateTaskAdminDto: UpdateTaskAdminDto) {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (updateTaskAdminDto.projectId) {
      const project = await this.projectRepo.findOneBy({
        id: updateTaskAdminDto.projectId,
      });
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${updateTaskAdminDto.projectId} not found`,
        );
      }
      task.project = project;
    }

    if (updateTaskAdminDto.sprintId) {
      const sprint = await this.sprintRepo.findOneBy({
        id: updateTaskAdminDto.sprintId,
      });
      if (!sprint) {
        throw new NotFoundException(
          `Sprint with ID ${updateTaskAdminDto.sprintId} not found`,
        );
      }
      task.sprint = sprint;
    }

    if (updateTaskAdminDto.boardColumnId) {
      const boardColumn = await this.boardColumnRepo.findOneBy({
        id: updateTaskAdminDto.boardColumnId,
      });
      if (!boardColumn) {
        throw new NotFoundException(
          `Board column with ID ${updateTaskAdminDto.boardColumnId} not found`,
        );
      }
      task.boardColumn = boardColumn;
    }

    if (updateTaskAdminDto.assignedUserId) {
      const assignedUser = await this.userRepo.findOneBy({
        id: updateTaskAdminDto.assignedUserId,
      });
      if (!assignedUser) {
        throw new NotFoundException(
          `User with ID ${updateTaskAdminDto.assignedUserId} not found`,
        );
      }
      task.assignedUser = assignedUser;
    }

    if (updateTaskAdminDto.createdById) {
      const createdBy = await this.userRepo.findOneBy({
        id: updateTaskAdminDto.createdById,
      });
      if (!createdBy) {
        throw new NotFoundException(
          `User with ID ${updateTaskAdminDto.createdById} not found`,
        );
      }
      task.createdBy = createdBy;
    }

    Object.assign(task, {
      title: updateTaskAdminDto.title,
      description: updateTaskAdminDto.description,
    });
    return this.taskRepo.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.taskRepo.remove(task);
    return { message: 'Task deleted successfully' };
  }

  // Label Management
  async getAllLabels(page = 1, limit = 10) {
    const [labels, total] = await this.labelRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['taskLinks'],
    });
    return { labels, total, page, limit };
  }

  async getLabelById(id: number) {
    const label = await this.labelRepo.findOne({
      where: { id },
      relations: ['taskLinks'],
    });
    if (!label) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    return label;
  }

  async createLabel(createLabelAdminDto: CreateLabelAdminDto) {
    const label = this.labelRepo.create(createLabelAdminDto);
    return this.labelRepo.save(label);
  }

  async updateLabel(id: number, updateLabelAdminDto: UpdateLabelAdminDto) {
    const label = await this.labelRepo.findOneBy({ id });
    if (!label) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    Object.assign(label, updateLabelAdminDto);
    return this.labelRepo.save(label);
  }

  async deleteLabel(id: number) {
    const label = await this.labelRepo.findOneBy({ id });
    if (!label) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    await this.labelRepo.remove(label);
    return { message: 'Label deleted successfully' };
  }

  // Comment Management
  async getAllComments(page = 1, limit = 10) {
    const [comments, total] = await this.commentRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['task', 'author'],
    });
    return { comments, total, page, limit };
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['task', 'author'],
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async createComment(createCommentAdminDto: CreateCommentAdminDto) {
    const task = await this.taskRepo.findOneBy({
      id: createCommentAdminDto.taskId,
    });
    if (!task) {
      throw new NotFoundException(
        `Task with ID ${createCommentAdminDto.taskId} not found`,
      );
    }

    const author = await this.userRepo.findOneBy({
      id: createCommentAdminDto.authorId,
    });
    if (!author) {
      throw new NotFoundException(
        `User with ID ${createCommentAdminDto.authorId} not found`,
      );
    }

    const comment = this.commentRepo.create({
      content: createCommentAdminDto.content,
      task,
      author,
    });
    return this.commentRepo.save(comment);
  }

  async updateComment(
    id: number,
    updateCommentAdminDto: UpdateCommentAdminDto,
  ) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (updateCommentAdminDto.taskId) {
      const task = await this.taskRepo.findOneBy({
        id: updateCommentAdminDto.taskId,
      });
      if (!task) {
        throw new NotFoundException(
          `Task with ID ${updateCommentAdminDto.taskId} not found`,
        );
      }
      comment.task = task;
    }

    if (updateCommentAdminDto.authorId) {
      const author = await this.userRepo.findOneBy({
        id: updateCommentAdminDto.authorId,
      });
      if (!author) {
        throw new NotFoundException(
          `User with ID ${updateCommentAdminDto.authorId} not found`,
        );
      }
      comment.author = author;
    }

    if (updateCommentAdminDto.content) {
      comment.content = updateCommentAdminDto.content;
    }

    return this.commentRepo.save(comment);
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepo.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    await this.commentRepo.remove(comment);
    return { message: 'Comment deleted successfully' };
  }

  // Team Invite Management
  async getAllTeamInvites(page = 1, limit = 10) {
    const [invites, total] = await this.teamInviteRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['team', 'invitedUser', 'invitedBy'],
    });
    return { invites, total, page, limit };
  }

  async getTeamInviteById(id: number) {
    const invite = await this.teamInviteRepo.findOne({
      where: { id },
      relations: ['team', 'invitedUser', 'invitedBy'],
    });
    if (!invite) {
      throw new NotFoundException(`Team invite with ID ${id} not found`);
    }
    return invite;
  }

  async createTeamInvite(createTeamInviteAdminDto: CreateTeamInviteAdminDto) {
    const team = await this.teamRepo.findOneBy({
      id: createTeamInviteAdminDto.teamId,
    });
    if (!team) {
      throw new NotFoundException(
        `Team with ID ${createTeamInviteAdminDto.teamId} not found`,
      );
    }

    const invitedUser = await this.userRepo.findOneBy({
      id: createTeamInviteAdminDto.invitedUserId,
    });
    if (!invitedUser) {
      throw new NotFoundException(
        `User with ID ${createTeamInviteAdminDto.invitedUserId} not found`,
      );
    }

    const invitedBy = await this.userRepo.findOneBy({
      id: createTeamInviteAdminDto.invitedById,
    });
    if (!invitedBy) {
      throw new NotFoundException(
        `User with ID ${createTeamInviteAdminDto.invitedById} not found`,
      );
    }

    const invite = this.teamInviteRepo.create({
      team,
      invitedUser,
      invitedBy,
      accepted: createTeamInviteAdminDto.accepted || false,
    });
    return this.teamInviteRepo.save(invite);
  }

  async updateTeamInvite(
    id: number,
    updateTeamInviteAdminDto: UpdateTeamInviteAdminDto,
  ) {
    const invite = await this.teamInviteRepo.findOneBy({ id });
    if (!invite) {
      throw new NotFoundException(`Team invite with ID ${id} not found`);
    }

    if (updateTeamInviteAdminDto.teamId) {
      const team = await this.teamRepo.findOneBy({
        id: updateTeamInviteAdminDto.teamId,
      });
      if (!team) {
        throw new NotFoundException(
          `Team with ID ${updateTeamInviteAdminDto.teamId} not found`,
        );
      }
      invite.team = team;
    }

    if (updateTeamInviteAdminDto.invitedUserId) {
      const invitedUser = await this.userRepo.findOneBy({
        id: updateTeamInviteAdminDto.invitedUserId,
      });
      if (!invitedUser) {
        throw new NotFoundException(
          `User with ID ${updateTeamInviteAdminDto.invitedUserId} not found`,
        );
      }
      invite.invitedUser = invitedUser;
    }

    if (updateTeamInviteAdminDto.invitedById) {
      const invitedBy = await this.userRepo.findOneBy({
        id: updateTeamInviteAdminDto.invitedById,
      });
      if (!invitedBy) {
        throw new NotFoundException(
          `User with ID ${updateTeamInviteAdminDto.invitedById} not found`,
        );
      }
      invite.invitedBy = invitedBy;
    }

    if (updateTeamInviteAdminDto.accepted !== undefined) {
      invite.accepted = updateTeamInviteAdminDto.accepted;
    }

    return this.teamInviteRepo.save(invite);
  }

  async deleteTeamInvite(id: number) {
    const invite = await this.teamInviteRepo.findOneBy({ id });
    if (!invite) {
      throw new NotFoundException(`Team invite with ID ${id} not found`);
    }
    await this.teamInviteRepo.remove(invite);
    return { message: 'Team invite deleted successfully' };
  }

  // Task Label Management
  async getAllTaskLabels(page = 1, limit = 10) {
    const [taskLabels, total] = await this.taskLabelRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['task', 'label'],
    });
    return { taskLabels, total, page, limit };
  }

  async getTaskLabel(taskId: number, labelId: number) {
    const taskLabel = await this.taskLabelRepo.findOne({
      where: { taskId, labelId },
      relations: ['task', 'label'],
    });
    if (!taskLabel) {
      throw new NotFoundException(
        `Task label with task ID ${taskId} and label ID ${labelId} not found`,
      );
    }
    return taskLabel;
  }

  async createTaskLabel(createTaskLabelAdminDto: CreateTaskLabelAdminDto) {
    const task = await this.taskRepo.findOneBy({
      id: createTaskLabelAdminDto.taskId,
    });
    if (!task) {
      throw new NotFoundException(
        `Task with ID ${createTaskLabelAdminDto.taskId} not found`,
      );
    }

    const label = await this.labelRepo.findOneBy({
      id: createTaskLabelAdminDto.labelId,
    });
    if (!label) {
      throw new NotFoundException(
        `Label with ID ${createTaskLabelAdminDto.labelId} not found`,
      );
    }

    const existingTaskLabel = await this.taskLabelRepo.findOne({
      where: {
        taskId: createTaskLabelAdminDto.taskId,
        labelId: createTaskLabelAdminDto.labelId,
      },
    });
    if (existingTaskLabel) {
      throw new BadRequestException('Task label already exists');
    }

    const taskLabel = this.taskLabelRepo.create({
      taskId: createTaskLabelAdminDto.taskId,
      labelId: createTaskLabelAdminDto.labelId,
      task,
      label,
    });
    return this.taskLabelRepo.save(taskLabel);
  }

  async deleteTaskLabel(taskId: number, labelId: number) {
    const taskLabel = await this.taskLabelRepo.findOne({
      where: { taskId, labelId },
    });
    if (!taskLabel) {
      throw new NotFoundException(
        `Task label with task ID ${taskId} and label ID ${labelId} not found`,
      );
    }
    await this.taskLabelRepo.remove(taskLabel);
    return { message: 'Task label deleted successfully' };
  }

  // System Statistics
  async getSystemStats() {
    const [
      userCount,
      teamCount,
      projectCount,
      sprintCount,
      taskCount,
      commentCount,
      labelCount,
    ] = await Promise.all([
      this.userRepo.count(),
      this.teamRepo.count(),
      this.projectRepo.count(),
      this.sprintRepo.count(),
      this.taskRepo.count(),
      this.commentRepo.count(),
      this.labelRepo.count(),
    ]);

    return {
      users: userCount,
      teams: teamCount,
      projects: projectCount,
      sprints: sprintCount,
      tasks: taskCount,
      comments: commentCount,
      labels: labelCount,
    };
  }
}
