import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('1. Starting bootstrap');

  const app = await NestFactory.create(AppModule);
  console.log('2. Nest application created');

  app.enableCors({
    origin: [
      'https://finances-web-tau.vercel.app',
      'http://localhost:3000',
    ],
    credentials: true,
  });

  console.log('3. CORS configured');

  await app.listen(3333);

  console.log('4. Server listening on port 3333');
}

bootstrap().catch(console.error);
