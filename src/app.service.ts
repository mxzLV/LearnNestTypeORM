import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testConnection(): object {
    return {
      status: '200',
      msg: 'Connection OK',
    };
  }
}
