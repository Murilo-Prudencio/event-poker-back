import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('poker_types_events')
export class PokerTypeEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) 
  name: string | null;
}
