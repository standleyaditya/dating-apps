import { Module } from '@nestjs/common';
import { SwipesService } from './swipes.service';
import { SwipesController } from './swipes.controller';
import { Swipe } from './entities/swipe.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ProfilesService } from 'src/profiles/profiles.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PremiumsModule } from 'src/premiums/premiums.module';
import { PackagesModule } from 'src/packages/packages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User, Swipe]), // Register entities here
    ProfilesModule,
    UsersModule,
    PremiumsModule,
    PackagesModule,
  ],
  providers: [SwipesService, ProfilesService, UsersService],
  controllers: [SwipesController],
  exports: [SwipesService],
})
export class SwipesModule {}
