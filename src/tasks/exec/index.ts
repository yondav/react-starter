import { exec } from 'child_process';
import { promisify } from 'util';

import chalk from 'chalk';
import ora from 'ora';

import { Colors } from '../../utils/enums';
import type { ExecuteCommandOptions, SpinnerOptions } from '../../utils/types';

const asyncExec = promisify(exec);

async function task({ command, cwd }: ExecuteCommandOptions): Promise<void> {
  await asyncExec(command, { cwd });
}

export default async function executeCommand({
  command,
  cwd,
  spinner,
}: ExecuteCommandOptions & {
  spinner?: SpinnerOptions;
}): Promise<void> {
  const taskSpinner = ora({
    color: 'cyan',
    text: chalk.hex(Colors.BRIGHTYELLOW)(
      spinner?.text ?? `running command: ${command}...`
    ),
  });

  try {
    taskSpinner.start();
    await task({ command, cwd });
    taskSpinner.succeed(
      chalk.hex(Colors.BRIGHTGREEN)(spinner?.success ?? `command: ${command} succeeded`)
    );
  } catch (err: unknown) {
    taskSpinner.fail(
      chalk.hex(Colors.BRIGHTRED)(spinner?.fail ?? `command: ${command} failed`)
    );
  }
}
