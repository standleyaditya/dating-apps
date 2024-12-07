import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

// const configService = new ConfigService();

const AppDataSource = new DataSource({
  // type: 'postgres',
  // host: configService.get<string>('DATABASE_HOST'),
  // port: parseInt(configService.get<string>('DATABASE_PORT'), 5432),
  // username: configService.get<string>('DATABASE_USER'),
  // password: configService.get<string>('DATABASE_PASSWORD'),
  // database: configService.get<string>('DATABASE_NAME'),
  // synchronize: false,
  // entities: ['**/*.entity.ts'],
  // migrations: ['src/database/migrations/*-migration.ts'],
  // migrationsRun: false,
  // logging: true,
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['**/*.entity.ts'],
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
