import { Style } from '../../utils/enums';
import sortObj from '../../utils/helpers/sortObj';
import type { ScriptConfig } from '../../utils/types';

export function vscodeConfigBody({ style }: Pick<ScriptConfig, 'style'>) {
  const settings: Record<string, unknown> = {
    'emmet.includeLanguages': {
      javascript: 'javascriptreact',
    },
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.formatOnPaste': true,
    'editor.formatOnType': true,
    'editor.formatOnSave': true,
    'files.trimTrailingWhitespace': true,
    'files.trimFinalNewlines': true,
  };

  const recommendations: string[] = [
    'dbaeumer.vscode-eslint',
    'dsznajder.es7-react-js-snippets',
    'eamodio.gitlens',
    'editorconfig.editorconfig',
    'esbenp.prettier-vscode',
    'formulahendry.auto-rename-tag',
    'GitHub.vscode-pull-request-github',
    'hwencc.html-tag-wrapper',
    'konstantin.wrapSelection',
    'mikestead.dotenv',
    'planbcoding.vscode-react-refactor',
    'sburg.vscode-javascript-booster',
    'yondav.vibe',
    'ZainChen.json',
  ];

  if (style === Style.TWINMACRO)
    recommendations.push(
      'lightyen.tailwindcss-intellisense-twin',
      'bradlc.vscode-tailwindcss'
    );

  return {
    settings: JSON.stringify(sortObj(settings), null, '\t'),
    extensions: JSON.stringify({ recommendations: recommendations.sort() }, null, '\t'),
  };
}
