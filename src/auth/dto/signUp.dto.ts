import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'Please enter correct email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
