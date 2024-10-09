import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getData', () => {
    it('should return "its a string"', () => {
      expect(appController.getData()).toBe('its a string');
    });
  });

  describe('getTestById', () => {
    it('should return "Test ID: 1" for ID 1', () => {
      expect(appController.getTestById('1')).toBe('Test ID: 1');
    });
  });
});
