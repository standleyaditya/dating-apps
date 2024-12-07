import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Profile } from './entities/profile.entity';
// import { Premium } from 'src/premiums/entities/premium.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]), // Register entities here
    UsersModule,
  ],
  providers: [ProfilesService, UsersService],
  controllers: [ProfilesController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
