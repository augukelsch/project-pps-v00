import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config().parsed

async function startDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING!)
    console.log('You successfully connected to MongoDB!');
  } catch (err) {
    console.log(err.message)
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Running on Port: ', process.env.PORT)
  await app.listen(process.env.PORT ?? 3001);
  startDb();
}
bootstrap();