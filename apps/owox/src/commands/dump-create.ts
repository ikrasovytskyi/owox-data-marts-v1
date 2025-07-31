import { createRequire } from 'node:module';

import { BaseCommand } from './base.js';

const require = createRequire(import.meta.url);
const packageInfo = require('../../package.json');

/**
 * Command to create database dumps for the OWOX Data Marts application.
 * Requires @owox/backend to be installed.
 */
export default class DumpCreate extends BaseCommand {
  static override description = 'Create database dumps for the OWOX Data Marts application';
  static override examples = [
    '<%= config.bin %> dump-create',
    '<%= config.bin %> dump-create --log-format=json',
  ];
  static override flags = {
    ...BaseCommand.baseFlags,
  };

  /**
   * Main execution method for the dump-create command
   */
  public async run(): Promise<void> {
    const { flags } = await this.parse(DumpCreate);

    this.initializeLogging(flags);
    this.setupLogFormat(flags['log-format']);
    this.log(`🚀 Starting OWOX Data Marts Dump Create (v${packageInfo.version})...`);

    try {
      const { dumpInserts } = await import('@owox/backend');
      await dumpInserts();
    } catch (error) {
      this.handleStartupError(error);
    }
  }
}
