import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { isError, isSuccess } from 'src/constants/response-messages';
import { err, response } from 'src/constants/response.dto';
import { res, responseDto } from 'src/constants/response.dto';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<responseDto> {
    const { email } = signUpDto;
    const checkExsistingUser = await this.userModel.findOne({ email: email });
    if (checkExsistingUser) {
      return response(res, isError.alreadyExsists, HttpStatus.OK);
    }

    const password = this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({
      id: user._id,
      email,
      password,
      role: user.role,
    });
    return response(res, isSuccess.success, HttpStatus.OK, token);
  }

  private generateRandomPassword(length: number = 8): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return password;
  }

  async login(loginDto: SignUpDto): Promise<responseDto> {
    try {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({ email: email });
      if (!user || !user.isVerified) {
        return response(err, isError.notRegistered, HttpStatus.UNAUTHORIZED);
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return response(
          err,
          isError.invalidCredentials,
          HttpStatus.UNAUTHORIZED,
        );
      }
      const token = this.jwtService.sign({ id: user._id, role: user.role });
      return response(res, isSuccess.success, HttpStatus.OK, token);
    } catch (error) {
      return response(
        err,
        isError.fail,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async verify(token: string) {
    try {
      const decodedToken = jwtDecode(token);
      if (
        !decodedToken.hasOwnProperty('email') ||
        !decodedToken.hasOwnProperty('password')
      ) {
        return response(err, isError.notRegistered, HttpStatus.UNAUTHORIZED);
      }

      const user = await this.userModel
        .findOne({
          email: decodedToken['email'],
        })
        .exec();

      if (!user) {
        return response(err, isError.notRegistered, HttpStatus.UNAUTHORIZED);
      }

      await this.userModel
        .findByIdAndUpdate(user._id, { isVerified: true })
        .exec();
      return response(res, isSuccess.verified, HttpStatus.UNAUTHORIZED);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        return response(err, isError.tokenExpired, HttpStatus.BAD_REQUEST);
      }

      return response(err, isError.fail, HttpStatus.BAD_REQUEST);
    }
  }
}
