import { ApiPropertyOptional } from '@nestjs/swagger';

export class FinishingEventDto {
  @ApiPropertyOptional({
    description: 'The winner of event name.',
    example: 'Gaviões da Fiel',
  })
  winner: string;

  @ApiPropertyOptional({
    description: 'The event is finished?',
    example: true,
  })
  finished: boolean;
}
