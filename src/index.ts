import chalk from 'chalk';
import { Command } from 'commander';

import app from './app';
import { flags, intro, questionnaire } from './cli';
import type { ScriptConfig } from './utils/types';

const program = new Command();

(async (): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(intro(process.stdout.columns));

  const flagConfig = await flags(program);
  const config = flagConfig.projectName
    ? (flagConfig as ScriptConfig)
    : await questionnaire();

  await app(config);
})().catch((err: Error) => {
  console.error(`
  ${chalk.red(err.message)}
`);
  process.exit(1);
});
