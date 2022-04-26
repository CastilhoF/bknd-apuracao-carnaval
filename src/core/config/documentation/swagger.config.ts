import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('O Dia - Backend - Apuração Carnaval')
  .setDescription(
    'API made for the verification of carnival, database in MySQL and stack backend in NestJS.',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
