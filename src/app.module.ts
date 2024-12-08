import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';
import { SwipesModule } from './swipes/swipes.module';
import { PackagesModule } from './packages/packages.module';
import { PremiumsModule } from './premiums/premiums.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { Package } from './packages/entities/package.entity';
import { Premium } from './premiums/entities/premium.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Swipe } from './swipes/entities/swipe.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

ConfigModule.forRoot();
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    ProfilesModule,
    UsersModule,
    SwipesModule,
    PackagesModule,
    PremiumsModule,
    AuthModule,
    ConfigModule.forRoot(),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [typeorm],
    // }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) =>
    //     configService.get('typeorm'),
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      entities: [User, Package, Premium, Profile, Swipe],
      // migrations: [src/database/migrations/*-migration.ts],
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
