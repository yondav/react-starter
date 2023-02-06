import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import ora from 'ora';

import { Colors } from '../../utils/enums';
import type { SpinnerOptions, MakeDirOptions } from '../../utils/types';

async function task({ destination, dirName }: MakeDirOptions): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.mkdir(path.join(destination, dirName), err => {
      if (err) {
        reject(err);

        throw err;
      }

      resolve();
    });
  });
}

export default async function makeDir({
  destination,
  dirName,
  spinner,
}: MakeDirOptions & { spinner?: SpinnerOptions }): Promise<void> {
  const taskSpinner = ora({
    color: 'cyan',
    text: chalk.hex(Colors.BRIGHTYELLOW)(
      spinner?.text ?? `adding directory ${dirName}...`
    ),
  });

  try {
    taskSpinner.start();
    await task({ destination, dirName });
    taskSpinner.succeed(
      chalk.hex(Colors.BRIGHTGREEN)(spinner?.success ?? `directory ${dirName} written`)
    );
  } catch (err: unknown) {
    taskSpinner.fail(
      chalk.hex(Colors.BRIGHTRED)(spinner?.fail ?? `failed to write directory ${dirName}`)
    );
  }
}
