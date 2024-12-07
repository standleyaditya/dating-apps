import { Test, TestingModule } from '@nestjs/testing';
import { PremiumsController } from './premiums.controller';
import { PremiumsService } from './premiums.service';

describe('PremiumsController', () => {
  let controller: PremiumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PremiumsController],
      providers: [PremiumsService],
    }).compile();

    controller = module.get<PremiumsController>(PremiumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
