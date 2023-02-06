export default {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  ignorePatterns: ['node_modules'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        project: 'tsconfig.eslint.json',
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint', 'prettier', 'import'],
      extends: [
        'airbnb-typescript-prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        'no-console': [
          'warn',
          {
            allow: ['warn', 'error'],
          },
        ],
        'import/prefer-default-export': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
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
    {
      files: ['src/**/*.{ts,tsx}'],
      env: {
        browser: true,
      },
      extends: ['plugin:react/recommended'],
      plugins: ['react', 'react-hooks'],
      settings: {
        react: {
          version: 'detect',
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            project: 'tsconfig.eslint.json',
          },
        },
      },
    },
    {
      files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
  ],
};
