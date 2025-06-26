import { config as dotenvConfig } from 'dotenv';
import findUp from 'find-up';
import { Logger } from '@nestjs/common';

const logger = new Logger('LoadEnv');

let isLoaded = false;

export function loadEnv(): void {
  if (isLoaded) return;

  const baseEnvName = '.env';
  const devEnvName = '.env.dev';
  const baseEnvPath = findUp.sync(baseEnvName);
  const devEnvPath = findUp.sync(devEnvName);

  if (baseEnvPath) {
    dotenvConfig({ path: baseEnvPath });
    logger.log(`Loaded ${baseEnvName} from ${baseEnvPath}`);
  }

  if (devEnvPath) {
    dotenvConfig({ path: devEnvPath, override: true });
    logger.log(`Loaded ${devEnvName} from ${devEnvPath}`);
  }

  if (!baseEnvPath && !devEnvPath) {
    logger.warn(`No ${baseEnvName} or ${devEnvName} file found`);
  }

  isLoaded = true;
}
