import { Bundler } from '../../../utils/enums';
import type { ScriptConfig } from '../../../utils/types';

export default function jsEslint({ bundler }: Pick<ScriptConfig, 'bundler'>) {
  const settings = {
    'import/resolver':
      bundler === Bundler.PARCEL
        ? 'parcel'
        : {
            webpack: { config: './.config/webpack' },
          },
    react: { version: 'detect' },
  };

  return {
    env: {
      node: true,
      es2021: true,
    },
    extends: [
      'airbnb-base',
      'eslint:recommended',
      'prettier',
      'plugin:import/errors',
      'plugin:import/warnings',
    ],
    ignorePatterns: ['node_modules'],
    overrides: [
      {
        files: ['src/**/*.{js,jsx}'],
        env: { browser: true },
        extends: ['plugin:react/recommended'],
        parserOptions: {
          ecmaVersion: 'latest',
          ecmaFeatures: { jsx: true },
          sourceType: 'module',
        },
        plugins: ['react', 'react-hooks'],
        settings,
        rules: {
          'no-console': ['warn', { allow: ['warn', 'error'] }],
          'import/prefer-default-export': 'off',
          'import/order': [
            'error',
            {
              alphabetize: {
                order: 'asc',
              },
              groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
              'newlines-between': 'always',
              warnOnUnassignedImports: true,
            },
          ],
        },
      },
    ],
  };
}
