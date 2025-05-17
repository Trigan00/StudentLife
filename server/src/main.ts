import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as serveStatic from 'serve-static';
import { join } from 'path';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });
  app.use(cookieParser());
  app.use('/uploads', serveStatic(join(__dirname, '..', 'uploads')));
  app.use(
    '/QandA-uploads',
    serveStatic(join(__dirname, '..', 'QandA-uploads')),
  );
  await app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
}
bootstrap();
