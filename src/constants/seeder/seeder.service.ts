import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schema/user.schema';
import { res, response, responseDto } from '../response.dto';
import { isSuccess } from '../response-messages';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async seedAdmin(): Promise<responseDto> {
    const existingAdmin = await this.userModel.findOne().exec();
    if (!existingAdmin) {
      const result = await this.userModel.create({
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
      });
      return response(res, isSuccess.success, HttpStatus.OK, result);
    }
  }
}
