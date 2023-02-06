import path from 'path';

import chalk from 'chalk';
import ncp from 'ncp';
import ora from 'ora';

import { Colors } from '../../utils/enums';
import type { CopyTaskOptions, SpinnerOptions } from '../../utils/types';

async function task({ destination, directory }: CopyTaskOptions): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const source = path.join(
      path.resolve(__dirname, '..', '..', 'lib'),
      `./${directory}`
    );
    const ncpOptions: ncp.Options = { clobber: false, stopOnErr: true };

    ncp(source, destination, ncpOptions, err => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve();
    });
  });
}

export default async function copyDir({
  destination,
  directory,
  spinner,
}: CopyTaskOptions & { spinner?: SpinnerOptions }): Promise<void> {
  // const { text, success, fail } = spinner;

  const taskSpinner = ora({
    color: 'cyan',
    text: chalk.hex(Colors.BRIGHTYELLOW)(
      spinner?.text ?? `copying directory: ${directory}...`
    ),
  });

  try {
    taskSpinner.start();
    await task({ destination, directory });
    taskSpinner.succeed(
      chalk.hex(Colors.BRIGHTGREEN)(spinner?.success ?? `copied directory: ${directory}`)
    );
  } catch (err: unknown) {
    taskSpinner.fail(
      chalk.hex(Colors.BRIGHTRED)(
        spinner?.fail ?? `failed to copy directory: ${directory}`
      )
    );
  }
}
