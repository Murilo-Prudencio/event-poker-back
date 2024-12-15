import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokerTypeEvent } from 'src/database/entities/PokerTypeEvent/poker-type-event.entity';
import { PokerTypeEventsService } from './poker-type-events.service';
import { PokerTypeEventsController } from './poker-type-events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PokerTypeEvent])],
  controllers: [PokerTypeEventsController],
  providers: [PokerTypeEventsService],
})
export class PokerTypeEventsModule {}
