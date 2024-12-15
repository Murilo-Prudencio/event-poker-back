import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from './modules/file/file.module';
import { typeOrmConfig } from './modules/typeOrm/typeorm.module'; 
import { AuthModule } from './modules/auth/auth.module';
import { PokerTypeEventsModule } from './modules/pokerTypeEvent/poker-type-events.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    TypeOrmModule.forRoot(typeOrmConfig),

    FileModule,
    AuthModule,
    PokerTypeEventsModule,
    RedisModule,
  ],
})
export class AppModule {}
