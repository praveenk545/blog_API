import { Test, TestingModule } from '@nestjs/testing';
import { NewAuthService } from './new-auth.service';

describe('NewAuthService', () => {
  let service: NewAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewAuthService],
    }).compile();

    service = module.get<NewAuthService>(NewAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
