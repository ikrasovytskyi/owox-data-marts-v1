import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createDataSourceOptions } from './config/data-source-options.config';
import { loadEnv } from './load-env';

// Load environment variables in case when run migrations manually by command
loadEnv();
const configService = new ConfigService();
const dataSourceOptions = createDataSourceOptions(configService);

export default new DataSource(dataSourceOptions);
