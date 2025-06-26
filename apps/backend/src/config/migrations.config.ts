import dataSource from '../data-source';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('MigrationRunner');

export async function runMigrationsIfNeeded(config: ConfigService): Promise<void> {
  const shouldRun = config.get<string>('RUN_MIGRATIONS') === 'true';

  if (!shouldRun) {
    logger.log('RUN_MIGRATIONS is not set to "true". Skipping migrations.');
    return;
  }

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const migrations = await dataSource.runMigrations();
  if (migrations.length === 0) {
    logger.log('No new migrations to run');
  } else {
    logger.log(`Executed ${migrations.length} migration(s):`);
    migrations.forEach(m => {
      logger.log(`- ${m.name}`);
    });
  }
}
