import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTask } from './dto/create-task.dto';
import { response } from '../constants/response.dto';
import { isError } from '../constants/response-messages';
import { err } from '../constants/response.dto';
import type { Response } from 'express';
import { User } from 'src/auth/custom-decorators';
import { UserDto } from 'src/auth/dto/login.dto';
import { QueryFilters } from 'src/constants/query-filters.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async createTask(
    @Body() task: CreateTask,
    @User() user,
    @Res() res: Response,
  ) {
    try {
      const result = await this.taskService.createTask(task, user.id);
      return res.status(result.statusCode).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          response(err, isError.fail, HttpStatus.INTERNAL_SERVER_ERROR, err),
        );
    }
  }
  @Get()
  async getTask(
    @Query() params: QueryFilters,
    @User() user: UserDto,
    @Res() res: Response,
  ) {
    try {
      console.log('controller: ', user);
      const result = await this.taskService.getTasks(user, params);
      return res.status(result.statusCode).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          response(err, isError.fail, HttpStatus.INTERNAL_SERVER_ERROR, err),
        );
    }
  }
}
