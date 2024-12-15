import { Controller, Get, Param } from '@nestjs/common';
import { PokerTypeEventsService } from './poker-type-events.service';
import { PokerTypeEvent } from 'src/database/entities/PokerTypeEvent/poker-type-event.entity';

@Controller('poker-types-events') // Define a rota
export class PokerTypeEventsController {
  constructor(private readonly pokerTypeEventsService: PokerTypeEventsService) {}

  // Endpoint para pegar todos os tipos de poker
  @Get()
  async getAllPokerTypes(): Promise<PokerTypeEvent[]> {
    console.log('GET request received for /api/poker-types-events');
    return this.pokerTypeEventsService.getAllPokerTypes();
  }

  // Endpoint para pegar um tipo de poker por ID
  @Get(':id')
  async getPokerTypeById(@Param('id') id: number): Promise<PokerTypeEvent> {
    return this.pokerTypeEventsService.getPokerTypeById(id);
  }
}
