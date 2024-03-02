import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './enums/task.status';

export class QueryFilters {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  userId?: string;
}
