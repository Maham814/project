// external-token-verification.middleware.ts
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isError } from './constants/response-messages';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class TokenVerificationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerToken = req.headers['authorization'];

      if (!bearerToken) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: isError.unAuthAccess,
        });
      }
      const jwtPayload = jwtDecode(bearerToken);
      if (!jwtPayload['id'] || !jwtPayload['role']) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: isError.unAuthAccess,
        });
      }
      req['user'] = {
        id: jwtPayload['id'],
        role: jwtPayload['role'],
      };
      req['token'] = bearerToken;
      next();
    } catch (error) {
      return res
        .status(
          error?.response?.data?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({
          statusCode:
            error?.response?.data?.statusCode ||
            HttpStatus.INTERNAL_SERVER_ERROR,
          message: error?.response?.data?.message,
        });
    }
  }
}
