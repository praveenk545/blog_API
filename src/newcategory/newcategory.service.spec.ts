import { Test, TestingModule } from '@nestjs/testing';
import { NewcategoryService } from './newcategory.service';

describe('NewcategoryService', () => {
  let service: NewcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewcategoryService],
    }).compile();

    service = module.get<NewcategoryService>(NewcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
