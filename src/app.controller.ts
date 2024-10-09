import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  getData(): string {
    return this.appService.getData();
  }

  @Get(':id')
  getTestById(@Param('id') id: string): string {
    return this.appService.getTestById(id);
  }
}
