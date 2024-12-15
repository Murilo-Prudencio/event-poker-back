import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // Tipo do banco
  host: process.env.DB_HOST, // Endereço do banco
  port: +process.env.DB_PORT, // Porta do banco
  username: process.env.DB_USER, // Usuário do banco
  password: process.env.DB_PASSWORD, // Senha do banco
  database: process.env.DB_NAME, // Nome do banco de dados
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNC === 'true', // Se o banco de dados deve ser sincronizado (apenas para desenvolvimento)
  autoLoadEntities: true, // Carregar automaticamente as entidades
};
