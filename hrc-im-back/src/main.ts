import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('HRC Intern Management Platform')
    .setDescription("Here' the description")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);

  const baseUrl = (await app.getUrl()).replace('[::1]', 'localhost');

  logger.log('Server information');
  logger.log(`Server running on: ${baseUrl}`);
  logger.log(`Welcome on: ${baseUrl}/bienvenida`);
  logger.log(`Swagger documentation available at: ${baseUrl}/api`);
}
bootstrap();
