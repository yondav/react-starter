import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import ora from 'ora';

import { Colors } from '../../utils/enums';
import type { RemoveCommentsOptions, SpinnerOptions } from '../../utils/types';

async function task({ destination }: RemoveCommentsOptions): Promise<void> {
  function fromDir(dir: string) {
    if (!fs.existsSync(dir)) {
      console.error(chalk.hex(Colors.BRIGHTRED)`no dir: ${dir}`);
      return;
    }

    const files = fs.readdirSync(dir);

    files.forEach(f => {
      const filename = path.join(dir, f);
      const stat = fs.lstatSync(filename);

      if (stat.isDirectory()) {
        fromDir(filename);
      } else if (!stat.isDirectory() && /(.tsx?)$/.test(filename)) {
        const file = fs.openSync(filename, 'r+');
        const content = fs.readFileSync(file, 'utf8');
        const strippedContent = content
          .split('\n')
          .filter(line => !/(\/\/ @ts-nocheck)/gm.test(line))
          .join('\n');
        fs.writeFile(filename, strippedContent, err => {
          if (err) {
            throw err;
          }
        });
      }
    });
  }

  return new Promise((resolve, reject) => {
    try {
      fromDir(path.join(destination, 'src'));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export default async function removeTsComments({
  destination,
  spinner,
}: RemoveCommentsOptions & { spinner?: SpinnerOptions }): Promise<void> {
  const taskSpinner = ora({
    color: 'blue',
    text: chalk.hex(Colors.BLUE)(spinner?.text ?? `removing comments`),
  });

  try {
    await task({ destination });
    taskSpinner.succeed(
      chalk.hex(Colors.BRIGHTGREEN)(spinner?.text ?? `removed comments`)
    );
  } catch (err: unknown) {
    taskSpinner.fail(
      chalk.hex(Colors.BRIGHTRED)(spinner?.fail ?? `failed to remove comments`)
    );
  }
}
