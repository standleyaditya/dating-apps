import { Module } from '@nestjs/common';
import { PremiumsService } from './premiums.service';
import { PremiumsController } from './premiums.controller';

@Module({
  controllers: [PremiumsController],
  providers: [PremiumsService],
})
export class PremiumsModule {}
