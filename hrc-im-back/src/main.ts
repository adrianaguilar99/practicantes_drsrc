import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { createValidationPipe } from './pipes/validation.pipe';
import { ENV, getLocalExternalIP, setupSwagger } from './configs';
import { corsConfig } from './configs/cors.config';
import { handleInternalServerError } from './common/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.useGlobalPipes(createValidationPipe());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('api');

  if (ENV.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  try {
    app.enableCors(corsConfig);
  } catch (error) {
    handleInternalServerError(error.message);
  }

  const host =
    ENV.NODE_ENV === 'production' ? getLocalExternalIP() : 'localhost';
  await app.listen(ENV.PORT, host);

  const baseUrl = (await app.getUrl()).replace('[::1]', host);

  if (ENV.NODE_ENV !== 'production') {
    logger.log('Server information');
    logger.log(`Server running on: ${baseUrl}`);
    logger.log(`Welcome on: ${baseUrl}/api/tests/ok`);
    logger.log(
      `Swagger documentation available at: ${baseUrl}/api/v1/docs 🚀📒`,
    );
  }
}
console.log({ env: process.env.NODE_ENV });

bootstrap();
