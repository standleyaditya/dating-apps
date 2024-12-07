import { Test, TestingModule } from '@nestjs/testing';
import { PremiumsService } from './premiums.service';

describe('PremiumsService', () => {
  let service: PremiumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremiumsService],
    }).compile();

    service = module.get<PremiumsService>(PremiumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
