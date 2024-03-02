import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { UserRole } from 'src/constants/enums/user.role';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
