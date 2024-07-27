import { Test, TestingModule } from '@nestjs/testing';
import { NewcategoryController } from './newcategory.controller';
import { NewcategoryService } from './newcategory.service';

describe('NewcategoryController', () => {
  let controller: NewcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewcategoryController],
      providers: [NewcategoryService],
    }).compile();

    controller = module.get<NewcategoryController>(NewcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
