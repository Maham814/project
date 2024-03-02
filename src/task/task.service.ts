import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './schema/task.schema';
import mongoose from 'mongoose';
import { CreateTask } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { err, res, response, responseDto } from '../constants/response.dto';
import { isError, isSuccess } from '../constants/response-messages';
import { TaskStatus } from 'src/constants/enums/task.status';
import { UserRole } from 'src/constants/enums/user.role';
import { UserDto } from 'src/auth/dto/login.dto';
import { QueryFilters } from 'src/constants/query-filters.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Tasks.name)
    private taskModel: mongoose.Model<Tasks>,
  ) {}

  async createTask(data: CreateTask, userId: string): Promise<responseDto> {
    try {
      const task: TaskDto = {
        ...data,
        userId: userId,
        status: TaskStatus.TODO,
      };
      const newTask = await this.taskModel.create(task);
      if (!newTask) {
        return response(err, isError.fail, HttpStatus.BAD_REQUEST);
      }
      return response(res, isSuccess.created, HttpStatus.OK, newTask);
    } catch (err) {
      throw err;
    }
  }

  async getTasks(user: UserDto, params: QueryFilters): Promise<responseDto> {
    try {
      const page = params.page || Number(process.env.PAGE);
      const perPage = params.perPage || Number(process.env.PER_PAGE);
      const query = { ...params };
      query.userId =
        user.role === UserRole.USER ? user.id : params.userId || null;
      if (!query.userId) delete query.userId;
      delete query.page;
      delete query.perPage;
      const offset = (page - 1) * perPage;
      const totalCount = await this.taskModel.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
      const tasks = await this.taskModel
        .find(query)
        .skip(offset)
        .limit(perPage);
      return response(res, isSuccess.created, HttpStatus.OK, {
        tasks: tasks,
        pagination: {
          page,
          perPage,
          totalPages,
          totalCount,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
