import { Module } from '@nestjs/common';
import { PremiumsService } from './premiums.service';
import { PremiumsController } from './premiums.controller';
import { Premium } from './entities/premium.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesModule } from 'src/packages/packages.module';
import { UsersModule } from 'src/users/users.module';
import { Package } from 'src/packages/entities/package.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Premium, Package, User]),
    UsersModule,
    PackagesModule,
  ],
  controllers: [PremiumsController],
  providers: [PremiumsService],
})
export class PremiumsModule {}
