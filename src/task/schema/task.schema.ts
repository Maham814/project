import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from 'src/constants/enums/task.status';

@Schema({
  timestamps: true,
})
export class Tasks {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO,
    index: true,
  })
  status: TaskStatus;

  @Prop({ type: String, required: true })
  userId: string;
}

export const taskSchema = SchemaFactory.createForClass(Tasks);
