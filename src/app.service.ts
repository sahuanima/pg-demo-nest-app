import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const data = 'Hi, Anima here..';
    return 'Hello World!';
  }

  getData(): string {
    return 'its a string';
  }
}
