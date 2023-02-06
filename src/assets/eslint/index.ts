import { Language } from '../../utils/enums';
import type { ScriptConfig } from '../../utils/types';

import jestEslint from './jest';
import jsEslint from './js';
import tsEslint from './ts';

export function eslintBody({
  bundler,
  language,
  test,
}: Pick<ScriptConfig, 'bundler' | 'language' | 'test'>) {
  const config = language === Language.TS ? tsEslint : jsEslint({ bundler });

  if (test)
    (config.overrides as Record<string, unknown>[]).push(jestEslint({ language }));

  return JSON.stringify(config, null, '\t');
}
