import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './schema/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [MongooseModule.forFeature([{ name: 'Tasks', schema: taskSchema }])],
  exports: [TaskService],
})
export class TaskModule {}
