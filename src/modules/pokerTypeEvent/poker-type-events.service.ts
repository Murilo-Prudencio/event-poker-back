import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokerTypeEvent } from 'src/database/entities/PokerTypeEvent/poker-type-event.entity';

@Injectable()
export class PokerTypeEventsService {
  constructor(
    @InjectRepository(PokerTypeEvent)
    private readonly pokerTypeEventsRepository: Repository<PokerTypeEvent>,
  ) {}

  async getAllPokerTypes(): Promise<PokerTypeEvent[]> {
    console.log('Fetching all poker types');
    return this.pokerTypeEventsRepository.find();
  }

  async getPokerTypeById(id: number): Promise<PokerTypeEvent> {
    console.log(`Fetching poker type by id: ${id}`);
    return this.pokerTypeEventsRepository.findOneBy({ id });
  }
}
