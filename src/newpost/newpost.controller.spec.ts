import { Test, TestingModule } from '@nestjs/testing';
import { NewpostController } from './newpost.controller';
import { NewpostService } from './newpost.service';

describe('NewpostController', () => {
  let controller: NewpostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewpostController],
      providers: [NewpostService],
    }).compile();

    controller = module.get<NewpostController>(NewpostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
