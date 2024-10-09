import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private tests = [{ id: 1, name: 'Test 1' }];

  getHello(): string {
    const data = 'Hi, Anima here..';
    return 'Hello World!';
  }

  getData(): string {
    return 'its a string';
  }

  getTestById(id: string): string {
    return `Test ID: ${id}`;
  }
}
