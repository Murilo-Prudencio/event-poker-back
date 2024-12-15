import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post('set')
  async setKey(
    @Body('key') key: string,
    @Body('value') value: string,
    @Body('ttl') ttl?: number,
  ) {
    await this.redisService.set(key, value, ttl);
    return { message: `Chave '${key}' salva com sucesso.` };
  }

  @Get('get/:key')
  async getKey(@Param('key') key: string) {
    const value = await this.redisService.get(key);
    return value ? { key, value } : { message: `Chave '${key}' não encontrada.` };
  }

  @Delete('del/:key')
  async deleteKey(@Param('key') key: string) {
    const result = await this.redisService.del(key);
    return result > 0
      ? { message: `Chave '${key}' excluída com sucesso.` }
      : { message: `Chave '${key}' não encontrada.` };
  }

  @Get('keys/:pattern')
  async getKeys(@Param('pattern') pattern: string) {
    const keys = await this.redisService.keys(pattern);
    return keys.length
      ? { keys }
      : { message: `Nenhuma chave encontrada com o padrão '${pattern}'.` };
  }
}
