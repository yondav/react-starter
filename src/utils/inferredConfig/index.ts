import { execSync } from 'child_process';

import { Bundler, Language, LicenseName, Runner, Style } from '../enums';
import type { ScriptConfig } from '../types';

const inferredAuthor = () => {
  const name = execSync('git config --get user.name').toString().split('\n')[0];
  const email = execSync('git config --get user.email').toString().split('\n')[0];

  return {
    name,
    email,
    homepage: `https://github.com/${name}`,
  };
};

const inferredConfig: ScriptConfig = {
  author: inferredAuthor(),
  bundler: Bundler.WEBPACK,
  dependencies: {
    install: true,
    update: false,
  },
  git: true,
  description: 'built with @yondav/react-starter',
  language: Language.TS,
  license: LicenseName.MIT,
  projectName: 'react-starter',
  runner: Runner.YARN,
  style: Style.NONE,
  test: true,
  version: '1.0.0',
};

export { inferredConfig };
