import { Test, TestingModule } from '@nestjs/testing';
import { NewAuthController } from './new-auth.controller';
import { NewAuthService } from './new-auth.service';

describe('NewAuthController', () => {
  let controller: NewAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewAuthController],
      providers: [NewAuthService],
    }).compile();

    controller = module.get<NewAuthController>(NewAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
