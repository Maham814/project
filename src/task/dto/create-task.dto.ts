import { TaskDto } from './task.dto';
import { PickType } from '@nestjs/mapped-types';

export class CreateTask extends PickType(TaskDto, ['description', 'title']) {}
