import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import seed from './database/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  
  app.enableCors();
  // seed().catch(console.error);
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();