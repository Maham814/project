import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { TokenVerificationMiddleware } from './token.middleware';
import { User, userSchema } from './auth/schema/user.schema';
// import { SeederService } from './constants/seeder/seeder.service';
// import { SeederModule } from 'nestjs-seeder';

dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION, {
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      dbName: process.env.DB_NAME,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    // SeederModule.forRoot({
    //   useClass: SeederService,
    // }),
    TaskModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenVerificationMiddleware)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST },
        {
          path: 'auth/login',
          method: RequestMethod.POST,
        },
        { path: 'auth/verify-token', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
