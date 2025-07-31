import { createRequire } from 'node:module';

import { BaseCommand } from './base.js';

const require = createRequire(import.meta.url);
const packageInfo = require('../../package.json');

/**
 * Command to apply database dumps for the OWOX Data Marts application.
 * Requires @owox/backend to be installed.
 */
export default class DumpApply extends BaseCommand {
  static override description = 'Apply database dumps for the OWOX Data Marts application';
  static override examples = [
    '<%= config.bin %> dump-apply',
    '<%= config.bin %> dump-apply --log-format=json',
  ];
  static override flags = {
    ...BaseCommand.baseFlags,
  };

  /**
   * Main execution method for the dump-apply command
   */
  public async run(): Promise<void> {
    const { flags } = await this.parse(DumpApply);

    this.initializeLogging(flags);
    this.setupLogFormat(flags['log-format']);
    this.log(`🚀 Starting OWOX Data Marts Dump Apply (v${packageInfo.version})...`);

    try {
      const { applyDump } = await import('@owox/backend');
      await applyDump();
    } catch (error) {
      this.handleStartupError(error);
    }
  }
}
