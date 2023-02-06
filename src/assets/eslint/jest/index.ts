import { Language } from '../../../utils/enums';
import type { ScriptConfig } from '../../../utils/types';

export default function eslintJest({ language }: Pick<ScriptConfig, 'language'>) {
  const files =
    language === Language.JS
      ? ['**/*.{test,spec}.{js,jsx,ts,tsx}']
      : ['**/*.{test,spec}.{js,jsx}'];

  return {
    files,
    env: { jest: true },
    plugins: ['jest'],
    extends: ['plugin:jest/recommended', 'plugin:jest/style'],
  };
}
