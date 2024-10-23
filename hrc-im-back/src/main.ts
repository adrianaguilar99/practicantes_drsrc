import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { createValidationPipe } from './pipes/validation.pipe';
import { ENV, setupSwagger } from './configs';
import { corsConfig } from './configs/cors.config';
import { handleInternalServerError } from './common/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  // Configuración de la aplicación
  app.useGlobalPipes(createValidationPipe());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('api');

  setupSwagger(app);

  try {
    app.enableCors(corsConfig);
  } catch (error) {
    handleInternalServerError(error.message);
  }

  await app.listen(ENV.PORT);
  // await app.listen(ENV.PORT, '0.0.0.0');

  const baseUrl = (await app.getUrl()).replace('[::1]', 'localhost');

  logger.log('Server information');
  logger.log(`Server running on: ${baseUrl}`);
  logger.log(`Welcome on: ${baseUrl}/api/tests/ok`);
  logger.log(`Swagger documentation available at: ${baseUrl}/api/v1/docs 🚀📒`);
}
bootstrap();
