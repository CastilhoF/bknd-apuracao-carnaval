import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('O Dia - Backend - Apuração Carnaval')
  .setDescription('NestJS API')
  .setVersion('1.0')
  .addTag('odiabackend')
  .addTag('apuracao')
  .addTag('carnaval')
  .build();
