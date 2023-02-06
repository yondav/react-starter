import path from 'path';

import {
  babelBody,
  eslintBody,
  htmlBody,
  packageJsonBody,
  parcelBody,
  readmeBody,
  licenseBodies,
  vscodeConfigBody,
  tsconfigBody,
} from './assets';
import { copyDir, writeFile, makeDir, exec, removeTsComments } from './tasks';
import { Bundler, Language, Runner, Style } from './utils/enums';
import type { ScriptConfig } from './utils/types';

export default async function app({
  author,
  bundler,
  dependencies,
  git,
  description,
  language,
  license,
  projectName,
  runner,
  style,
  test,
  version,
}: ScriptConfig) {
  // Create project directory and copy common files
  await copyDir({
    destination: projectName,
    directory: 'common',
  });

  // Write html file
  await writeFile({
    destination: path.join(projectName, 'public'),
    fileName: 'index.html',
    body: htmlBody({ bundler, language }),
  });

  // Create package.json
  await writeFile({
    destination: projectName,
    fileName: 'package.json',
    body: packageJsonBody({
      author,
      bundler,
      description,
      git,
      language,
      license,
      projectName,
      runner,
      style,
      test,
      version,
    }),
  });

  // Create .babelrc file
  await writeFile({
    destination: projectName,
    fileName: '.babelrc',
    body: babelBody({ bundler, language, style }),
  });

  // Create .eslintrc file
  await writeFile({
    destination: projectName,
    fileName: '.eslintrc',
    body: eslintBody({ bundler, language, test }),
  });

  // Set up .vscode directory
  await makeDir({
    destination: projectName,
    dirName: '.vscode',
  });

  await writeFile({
    destination: path.join(projectName, '.vscode'),
    fileName: 'settings.json',
    body: vscodeConfigBody({ style }).settings,
  });

  await writeFile({
    destination: path.join(projectName, '.vscode'),
    fileName: 'extensions.json',
    body: vscodeConfigBody({ style }).extensions,
  });

  // Create LICENSE file
  await writeFile({
    destination: projectName,
    fileName: 'LICENSE',
    body: licenseBodies({ projectName })[license],
  });

  // Create README.md
  await writeFile({
    destination: projectName,
    fileName: 'README.md',
    body: readmeBody({ author, description, projectName, license, version }),
  });

  // Create tsconfig.json file
  if (language === Language.TS) {
    await writeFile({
      destination: projectName,
      fileName: 'tsconfig.json',
      body: tsconfigBody.base({ style }),
    });

    await writeFile({
      destination: projectName,
      fileName: 'tsconfig.eslint.json',
      body: tsconfigBody.eslint,
    });

    await writeFile({
      destination: projectName,
      fileName: 'tsconfig.jest.json',
      body: tsconfigBody.jest,
    });
  }

  // Copy src directory to destination
  switch (style) {
    case Style.TWINMACRO:
      await copyDir({
        destination: projectName,
        directory: path.join(language, 'tw'),
      });

      await copyDir({
        destination: projectName,
        directory: 'tw',
      });
      break;

    case Style.STYLEDCOMPONENTS:
      await copyDir({
        destination: projectName,
        directory: path.join(language, 'sc'),
      });
      break;

    case Style.NONE:
      await copyDir({
        destination: projectName,
        directory: path.join(language, 'default'),
      });
      break;

    default:
      await copyDir({
        destination: projectName,
        directory: path.join(language, 'default'),
      });
      break;
  }

  // Copy webpack config
  if (bundler === Bundler.WEBPACK)
    await copyDir({
      destination: projectName,
      directory: path.join('webpack', language),
    });

  // Write .parcelrc
  if (bundler === Bundler.PARCEL)
    await writeFile({
      destination: projectName,
      fileName: '.parcelrc',
      body: parcelBody,
    });

  // Copy jest config
  if (test)
    await copyDir({ destination: projectName, directory: path.join('jest', language) });

  // Remove ts comments
  if (language === Language.TS) await removeTsComments({ destination: projectName });

  // Copy git config files
  if (git) await copyDir({ destination: projectName, directory: 'git' });

  // Install dependencies
  if (dependencies.install) {
    await exec({
      command: `${runner} install`,
      cwd: projectName,
      spinner: {
        text: 'installing dependencies',
        success: 'dependencies installed',
        fail: 'failed to install dependencies',
      },
    });

    if (dependencies.update)
      await exec({
        command: runner === Runner.NPM ? 'npm update' : 'yarn upgrade',
        cwd: projectName,
        spinner: {
          text: 'updating dependencies',
          success: 'dependencies updated',
          fail: 'failed to update dependencies',
        },
      });

    // Format and lint all written files
    await exec({
      command: `${runner} run lint:fix`,
      cwd: projectName,
    });

    await exec({
      command: `${runner} run format`,
      cwd: projectName,
    });

    // Initialize git repo
    if (git) {
      await exec({ command: 'git init', cwd: projectName });
      await exec({ command: 'git add -A', cwd: projectName });
      await exec({ command: 'git commit -m "Initial commit"', cwd: projectName });
      await exec({
        command: "git config alias.cz '!yarn run commit'",
        cwd: projectName,
      });
    }
  }
}
