import { Controller, HttpStatus, Res, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { isError } from '../constants/response-messages';
import { Response } from 'express';
import { err, response } from 'src/constants/response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    try {
      const result = await this.authService.signUp(signUpDto);
      return res.status(result.statusCode).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          response(err, isError.fail, HttpStatus.INTERNAL_SERVER_ERROR, error),
        );
    }
  }

  @Post('/login')
  async login(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(signUpDto);
      return res.status(result.statusCode).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          response(err, isError.fail, HttpStatus.INTERNAL_SERVER_ERROR, err),
        );
    }
  }

  @Post('/verify-token')
  async verifyToken(@Body() body: { token: string }, @Res() res: Response) {
    try {
      const result = await this.authService.verify(body.token);
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
