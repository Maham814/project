import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'src/constants/enums/user.role';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'Email already exsists'] })
  email: string;

  @Prop({ type: String, required: false })
  password?: string;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
