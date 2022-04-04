import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix)
  const PORT = 5000
  await app.listen(PORT, () => {
    Logger.log(`Server on ${PORT} example : http://localhost:${PORT}/${globalPrefix}`)
  });
}
bootstrap();
