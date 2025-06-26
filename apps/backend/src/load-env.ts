import { config as dotenvConfig } from 'dotenv';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';

const logger = new Logger('LoadEnv');

let isLoaded = false;

export function loadEnv(): void {
  if (isLoaded) return;

  const baseEnvName = '.env';
  const devEnvName = '.env.dev';

  const isCompiled = __dirname.includes('dist');
  const baseDirPath = join(__dirname, ...(isCompiled ? ['..', '..'] : ['..']));

  const baseEnvPath = join(baseDirPath, baseEnvName);
  const devEnvPath = join(baseDirPath, devEnvName);

  const baseEnvExist = existsSync(baseEnvPath);
  if (baseEnvExist) {
    dotenvConfig({ path: baseEnvPath });
    logger.log(`Loaded ${baseEnvName} from ${baseEnvPath}`);
  }

  const devEnvExist = existsSync(devEnvPath);
  if (devEnvExist) {
    dotenvConfig({ path: devEnvPath, override: true });
    logger.log(`Loaded ${devEnvName} from ${devEnvPath}`);
  }

  if (!baseEnvExist && !devEnvExist) {
    logger.warn(`No ${baseEnvName} or ${devEnvName} file found`);
  }

  isLoaded = true;
}
