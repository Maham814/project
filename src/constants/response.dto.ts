import { HttpStatus } from '@nestjs/common';

export class responseDto {
  data?: any;
  message: string;
  statusCode?: HttpStatus;
  error?: any;
}

export function response(
  type: string,
  message: string,
  statusCode: HttpStatus,
  data?: any,
): responseDto {
  const responseObject: responseDto = {
    message: message,
    statusCode: statusCode,
  };
  if (type === 'response') {
    if (data) responseObject.data = data;
  } else if (type === 'error' && data) {
    responseObject.error = data;
  }
  return responseObject;
}

export const res = 'response';
export const err = 'error';
