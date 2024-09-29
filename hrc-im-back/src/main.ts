import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { createValidationPipe } from './pipes/validation.pipe';
import { ENV, setupSwagger } from './configs';
import { corsConfig } from './configs/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.enableCors(corsConfig);

  app.useGlobalPipes(createValidationPipe());

  app.setGlobalPrefix('api');

  setupSwagger(app);

  await app.listen(ENV.PORT);

  const baseUrl = (await app.getUrl()).replace('[::1]', 'localhost');

  logger.log('Server information');
  logger.log(`Server running on: ${baseUrl}`);
  logger.log(`Welcome on: ${baseUrl}/test`);
  logger.log(`Swagger documentation available at: ${baseUrl}/api/v1/docs 🚀📒`);
}
bootstrap();
