import { Bundler, Runner, Style, Language } from '../../utils/enums';
import sortObj from '../../utils/helpers/sortObj';
import type { ScriptConfig } from '../../utils/types';
import { licenses } from '../licenses';

export default {
  dependencies({ style }: Pick<ScriptConfig, 'style'>) {
    const dependenciesObj: Record<string, string> = {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.8.0',
    };

    if (style === Style.STYLEDCOMPONENTS) dependenciesObj['styled-components'] = '^5.3.6';
    if (style === Style.TWINMACRO) {
      dependenciesObj['styled-components'] = '^5.3.6';
      dependenciesObj.tailwindcss = '^3.2.4';
      dependenciesObj['twin.macro'] = '^3.1.0';
    }

    return sortObj(dependenciesObj);
  },

  devDependencies({
    bundler,
    git,
    language,
    test,
    style,
  }: Pick<ScriptConfig, 'bundler' | 'git' | 'language' | 'test' | 'style'>) {
    const devDependenciesObj: Record<string, string> = {
      '@babel/core': '^7.20.12',
      '@babel/preset-env': '^7.20.2',
      '@babel/preset-react': '^7.18.6',
      'babel-loader': '^9.1.2',
      eslint: '^8.32.0',
      'eslint-config-airbnb': '^19.0.4',
      'eslint-config-airbnb-base': '^15.0.0',
      'eslint-config-prettier': '^8.6.0',
      'eslint-plugin-import': '^2.27.5',
      'eslint-plugin-prettier': '^4.2.1',
      'eslint-plugin-react': '^7.32.1',
      'eslint-plugin-react-hooks': '^4.6.0',
      'open-cli': '^7.1.0',
      prettier: '^2.8.3',
    };

    if (bundler === Bundler.PARCEL) {
      devDependenciesObj['@parcel/packager-raw-url'] = '2.8.3';
      devDependenciesObj['@parcel/transformer-webmanifest'] = '2.8.3';
      devDependenciesObj.parcel = '^2.8.3';
      devDependenciesObj['parcel-resolver-ts-base-url'] = '^1.3.1';
      devDependenciesObj.process = '^0.11.10';

      if (language === Language.JS)
        devDependenciesObj['eslint-import-resolver-parcel'] = '^1.10.6';
    }

    if (bundler === Bundler.WEBPACK) {
      devDependenciesObj['@svgr/webpack'] = '^6.5.1';
      devDependenciesObj['compression-webpack-plugin'] = '^10.0.0';
      devDependenciesObj['copy-webpack-plugin'] = '^11.0.0';
      devDependenciesObj['css-loader'] = '^6.7.3';
      devDependenciesObj['dotenv-webpack'] = '^8.0.1';
      devDependenciesObj['file-loader'] = '^6.2.0';
      devDependenciesObj['html-webpack-plugin'] = '^5.5.0';
      devDependenciesObj['style-loader'] = '^3.3.1';
      devDependenciesObj['url-loader'] = '^4.1.1';
      devDependenciesObj.webpack = '^5.75.0';
      devDependenciesObj['webpack-bundle-analyzer'] = '^4.7.0';
      devDependenciesObj['webpack-cli'] = '^5.0.1';
      devDependenciesObj['webpack-dev-server'] = '^4.11.1';
      devDependenciesObj['webpack-merge'] = '^5.8.0';

      if (language === Language.TS)
        devDependenciesObj['tsconfig-paths-webpack-plugin'] = '^4.0.0';

      if (language === Language.JS)
        devDependenciesObj['eslint-import-resolver-webpack'] = '^0.13.2';
    }

    if (git) {
      devDependenciesObj.commitlint = '^17.4.2';
      devDependenciesObj['cz-customizable'] = '^7.0.0';
      devDependenciesObj.husky = '^8.0.3';
      devDependenciesObj['lint-staged'] = '^13.1.0';
    }

    if (language === Language.TS) {
      devDependenciesObj['@babel/preset-typescript'] = '^7.18.6';
      devDependenciesObj['@types/react'] = '^18.0.27';
      devDependenciesObj['@types/react-dom'] = '^18.0.10';
      devDependenciesObj['@types/react-router-dom'] = '^5.3.3';
      devDependenciesObj['@typescript-eslint/eslint-plugin'] = '^5.49.0';
      devDependenciesObj['@typescript-eslint/parser'] = '^5.49.0';
      devDependenciesObj['eslint-config-airbnb-typescript-prettier'] = '^5.0.0';
      devDependenciesObj['eslint-import-resolver-typescript'] = '^3.5.3';
      devDependenciesObj.typescript = '^4.9.4';
    }

    if (
      (style === Style.STYLEDCOMPONENTS || style === Style.TWINMACRO) &&
      language === Language.TS
    ) {
      devDependenciesObj['@types/styled-components'] = '^5.1.26';
    }

    if (style === Style.STYLEDCOMPONENTS)
      devDependenciesObj['babel-plugin-styled-components'] = '^2.0.7';

    if (style === Style.TWINMACRO) {
      devDependenciesObj['babel-plugin-macros'] = '^3.1.0';
      devDependenciesObj['babel-plugin-twin'] = '^1.1.0';
    }

    if (test) {
      devDependenciesObj['eslint-plugin-jest'] = '^27.2.1';
      devDependenciesObj['@testing-library/jest-dom'] = '^5.16.5';
      devDependenciesObj['@testing-library/react'] = '^13.4.0';
      devDependenciesObj.jest = '^29.4.1';
      devDependenciesObj['jest-environment-jsdom'] = '^29.4.1';
    }

    return sortObj(devDependenciesObj);
  },

  engines({ runner }: Pick<ScriptConfig, 'runner'>) {
    const node = '>=10.0.0';

    if (runner === Runner.NPM) return { node, npm: '>=3.0.0' };
    return { node, yarn: '>=1.0.0' };
  },

  extras({ git, style }: Pick<ScriptConfig, 'git' | 'style'>) {
    const extrasObj: Record<string, Record<string, Record<string, string>>> = {};

    if (git) {
      extrasObj.config = { commitizen: { path: 'cz-customizable' } };
      extrasObj.husky = { hooks: { 'pre-commit': 'sh-hooks/pre-commit' } };
    }

    if (style === Style.TWINMACRO)
      extrasObj.babelMacros = { twin: { preset: 'styled-components' } };

    return sortObj(extrasObj);
  },

  license({ license }: Pick<ScriptConfig, 'license'>) {
    return (licenses.find(l => l.name === license) || licenses[0]).spdx_id;
  },

  scripts({
    bundler,
    git,
    language,
    test,
  }: Pick<ScriptConfig, 'bundler' | 'git' | 'language' | 'test'>) {
    const scriptsObj: Record<string, string> = {
      build:
        bundler === Bundler.WEBPACK
          ? 'webpack --mode=production --config ./.config/webpack'
          : 'parcel build public/index.html',
      dev:
        bundler === Bundler.WEBPACK
          ? 'webpack serve --mode=development --config ./.config/webpack'
          : 'parcel public/index.html',
      format: 'prettier --ignore-path .gitignore --write .',
      lint:
        language === Language.TS
          ? `eslint . --ext "**/*.{ts,tsx,js,jsx}"`
          : 'eslint "**/*.{js,jsx}"',
      'lint:fix': `${
        language === Language.TS
          ? `eslint . --ext "**/*.{ts,tsx,js,jsx}"`
          : 'eslint "**/*.{js,jsx}"'
      } --fix`,
      serve: 'npx serve dist',
    };

    if (git) {
      scriptsObj.commit = 'node ./node_modules/cz-customizable/standalone.js';
      scriptsObj['lint:staged'] = 'lint-staged --config lint-staged.js';
      scriptsObj.prepare = 'husky install';
    }

    if (test) {
      scriptsObj.test = 'jest';
      scriptsObj['test:coverage'] =
        'jest --coverage && open-cli coverage/lcov-report/index.html';
    }

    return sortObj(scriptsObj);
  },
};
