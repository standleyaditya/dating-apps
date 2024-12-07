import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    //   AppModule,
    //   {
    //     transport: Transport.REDIS,
    //     options: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   },
    // );
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    throw await error;
  }
}
bootstrap();
