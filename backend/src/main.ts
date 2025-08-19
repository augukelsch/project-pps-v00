import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { readMyCSVFile } from './common/read.csv.files';

dotenv.config().parsed

const path = process.env.CSV_FILES_PATH

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
  
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4173',
      'http://localhost:4173',
      'https://project-pps-production.up.railway.app',
      'https://project-pps-v00-backend.up.railway.app'
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('PPS Project API Documentation')
    .setDescription('PPS Project API Documentation')
    .setVersion('1.0')
    .addTag('pps')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);

  app.use(
    '/reference',
    apiReference({
      theme: 'purple',
      content: documentFactory,
    }),
  )

  console.log('Running on Port: ', process.env.PORT)
  
  await app.listen(process.env.PORT ?? 3001);
  
  startDb();
  // readMyCSVFile(path)
}
bootstrap();

