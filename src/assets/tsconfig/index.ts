import { Style } from '../../utils/enums';
import type { ScriptConfig } from '../../utils/types';

export const tsconfigBody = {
  base: ({ style }: Pick<ScriptConfig, 'style'>) => {
    const include = ['src', 'types'];

    if (style === Style.STYLEDCOMPONENTS) include.push('styled.d.ts');
    if (style === Style.TWINMACRO) include.push('twin.d.ts');

    return JSON.stringify(
      {
        compilerOptions: {
          module: 'ESNext',
          target: 'ESNext',
          moduleResolution: 'node',
          jsx: 'preserve',
          baseUrl: './src',
          noEmit: true,
          strict: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true,
          allowSyntheticDefaultImports: true,
          noUnusedParameters: true,
          noImplicitReturns: true,
          isolatedModules: true,
          esModuleInterop: true,
          paths: {
            'components/*': ['components/*'],
            'contexts/*': ['contexts/*'],
            'hooks/*': ['hooks/*'],
            'pages/*': ['pages/*'],
            'styles/*': ['styles/*'],
            'types/*': ['types/*'],
            'utils/*': ['utils/*'],
            'views/*': ['views/*'],
            App: ['App'],
          },
        },
        include,
      },
      null,
      '\t'
    );
  },

  eslint: JSON.stringify(
    {
      extends: './tsconfig.json',
      include: ['**/*.tsx', '**/*.ts', '*.ts', '**/*.js', '*.js'],
      exclude: ['node_modules'],
    },
    null,
    '\t'
  ),

  jest: JSON.stringify(
    {
      extends: './tsconfig.json',
      compilerOptions: {
        jsx: 'react',
        allowJs: true,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        noImplicitAny: true,
        sourceMap: true,
        target: 'es5',
      },
      include: ['**/*.ts', '**/*.tsx'],
    },
    null,
    '\t'
  ),
};
