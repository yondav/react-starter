import { Bundler, Language, Style } from '../../utils/enums';
import type { ScriptConfig } from '../../utils/types';

export function babelBody({
  bundler,
  language,
  style,
}: Pick<ScriptConfig, 'bundler' | 'language' | 'style'>) {
  const presets = [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ];

  const plugins = [];

  if (language === Language.TS) presets.push('@babel/preset-typescript');

  if (style === Style.STYLEDCOMPONENTS || style === Style.TWINMACRO)
    plugins.push('babel-plugin-styled-components');

  if (style === Style.TWINMACRO) plugins.push('babel-plugin-twin', 'babel-plugin-macros');

  return bundler === Bundler.PARCEL
    ? JSON.stringify({ plugins })
    : JSON.stringify({ presets, plugins }, null, '\t');
}
