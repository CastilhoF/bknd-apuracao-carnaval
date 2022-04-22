import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('O Dia - Backend - Apuração Carnaval')
  .setVersion('1.0')
  .build();
