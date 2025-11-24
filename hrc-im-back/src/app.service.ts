import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Dreams Sapphire Resort & Spa!';
  }
}
