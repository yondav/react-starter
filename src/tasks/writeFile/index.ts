import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import ora from 'ora';

import { Colors } from '../../utils/enums';
import type { SpinnerOptions, WriteFileOptions } from '../../utils/types';

async function task({ destination, fileName, body }: WriteFileOptions): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(path.join(destination, fileName), body, err => {
      if (err) {
        reject(err);

        throw err;
      }

      resolve();
    });
  });
}

export default async function writeFile({
  destination,
  fileName,
  body,
  spinner,
}: WriteFileOptions & { spinner?: SpinnerOptions }): Promise<void> {
  const taskSpinner = ora({
    color: 'cyan',
    text: chalk.hex(Colors.BRIGHTYELLOW)(spinner?.text ?? `writing ${fileName}...`),
  });

  try {
    taskSpinner.start();
    await task({ destination, fileName, body });
    taskSpinner.succeed(
      chalk.hex(Colors.BRIGHTGREEN)(spinner?.success ?? `file ${fileName} written`)
    );
  } catch (err: unknown) {
    taskSpinner.fail(
      chalk.hex(Colors.BRIGHTRED)(spinner?.fail ?? `failed to write file ${fileName}`)
    );
  }
}
