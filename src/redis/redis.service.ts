import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis'; // Use a exportação padrão

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;

  constructor() {
    this.client = new Redis({ // Certifique-se de usar a exportação padrão
      host: 'localhost',
      port: 6379,
    });
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern);
  }

  async quit() {
    await this.client.quit();
  }

  onModuleDestroy() {
    this.quit();
  }
}
