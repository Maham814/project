import { IsEnum, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/constants/enums/task.status';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
