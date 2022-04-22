import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app/app.module';
import { TransformInterceptor } from './core/common/interceptors/transform.interceptor';
import { Logger } from '@nestjs/common';
import { swaggerConfig } from './core/config/documentation/swagger.config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = swaggerConfig;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService: ConfigService = new ConfigService();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(configService.get('PORT'), configService.get('HOST'));
  logger.log(
    `Application listening on port: ${configService.get(
      'PORT',
    )} and host: ${configService.get('HOST')}`,
  );
}
bootstrap();
