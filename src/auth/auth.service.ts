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
    console.log('password', password);
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
    console.log('what is the random password ?', password);
    return password;
  }

  async login(loginDto: SignUpDto): Promise<responseDto> {
    try {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({ email: email });
      console.log(user);
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
      console.log('-------------------', decodedToken);
      if (
        !decodedToken.hasOwnProperty('email') ||
        !decodedToken.hasOwnProperty('password')
      ) {
        return response(err, isError.notRegistered, HttpStatus.UNAUTHORIZED);
      }

      console.log(
        'data-------------------',
        decodedToken['email'],
        decodedToken['password'],
      );
      const user = await this.userModel
        .findOne({
          email: decodedToken['email'],
        })
        .exec();
      console.log('user==========', user);

      if (!user) {
        console.log('here');
        return response(err, isError.notRegistered, HttpStatus.UNAUTHORIZED);
      }

      const final = await this.userModel
        .findByIdAndUpdate(user._id, { isVerified: true })
        .exec();
      console.log('final', final.toObject);
      return response(res, isSuccess.verified, HttpStatus.UNAUTHORIZED);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        return response(err, isError.tokenExpired, HttpStatus.BAD_REQUEST);
      }

      return response(err, isError.fail, HttpStatus.BAD_REQUEST);
    }
  }

  // async verify(token: string): Promise<responseDto> {
  //   console.log('token ??', token);
  //   let decodedToken;
  //   try {
  //     decodedToken = this.jwtService.verify(token);
  //     console.log('decoded token', decodedToken);
  //   } catch (e) {
  //     return response(err, isError.tokenExpired, HttpStatus.BAD_REQUEST);
  //   }
  //   const { email, password } = decodedToken;
  //   const user = this.userModel.findOne({ email, password }).exec();
  //   console.log('what comes in the verify token user ?', user);
  //   if (!user) {
  //     return response(err, isError.notRegistered, HttpStatus.UNAUTHORIZED);
  //   }
  //   await this.userModel
  //     .findByIdAndUpdate((await user)._id, { isVerified: true })
  //     .exec();

  //   return {
  //     message:
  //       'User verified successfully. You can change your password if needed',
  //   };
  // }
}
