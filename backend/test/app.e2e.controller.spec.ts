import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('ControllerApp', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('ControllerAppTests', () => {
    it('should return "Health OK!"', () => {
      expect(appController.health()).toBe('OK, Service Running!');
    });
  });
});
