import type { ScriptConfig } from '../../utils/types';

import properties from './properties';

export function packageJsonBody(options: Omit<ScriptConfig, 'dependencies'>): string {
  const {
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
  } = options;

  return JSON.stringify(
    {
      name: projectName,
      version,
      description,
      author,
      license: properties.license({ license }),
      scripts: properties.scripts({ bundler, git, language, test }),
      dependencies: properties.dependencies({ style }),
      devDependencies: properties.devDependencies({
        bundler,
        git,
        language,
        test,
        style,
      }),
      browserslist: {
        production: ['>0.2%', 'not dead', 'not op_mini all'],
        development: [
          'last 1 chrome version',
          'last 1 firefox version',
          'last 1 safari version',
        ],
      },
      engines: properties.engines({ runner }),
      ...properties.extras({ git, style }),
    },
    null,
    '\t'
  );
}
