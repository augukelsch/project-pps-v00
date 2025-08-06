import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv'

dotenv.config().parsed

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Running on Port: ', process.env.PORT)
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
