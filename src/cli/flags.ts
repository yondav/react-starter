// import meow from 'meow';
import chalk from 'chalk';
import type { Command } from 'commander';

import { Bundler, Colors, Language, Runner, Style } from '../utils/enums';
import { inferredConfig } from '../utils/inferredConfig';
import type { Flags, ScriptConfig } from '../utils/types';

const styleText = (
  text: string,
  hex: Colors | null,
  style: 'bold' | 'italic' | 'underline' | null
) => {
  if (style && hex) return chalk[style].hex(hex)(text);
  if (style) return chalk[style](text);
  if (hex) return chalk.hex(hex)(text);
  return text;
};

export default async function flags(program: Command) {
  return new Promise<Partial<ScriptConfig>>((resolve, reject) => {
    try {
      program
        .version(styleText('1.0.0', null, 'bold'))
        .description(
          styleText(
            'A react boilerplate with options for bundling with parcel or webpack and styling with styled components or twin macros',
            Colors.BRIGHTYELLOW,
            'italic'
          )
        )
        .argument(
          `[${styleText('projectName', Colors.BLUE, null)}]`,
          styleText('Project name', Colors.BRIGHTYELLOW, 'italic'),
          inferredConfig.projectName
        )
        .option(
          styleText('-b, --bundler <bundler>', Colors.BRIGHTRED, null),
          styleText(
            `${Bundler.PARCEL} || ${Bundler.WEBPACK}`,
            Colors.BRIGHTYELLOW,
            'italic'
          ),
          inferredConfig.bundler
        )
        .option(
          styleText('-g, --git', Colors.BRIGHTRED, null),
          styleText('Initialize git repository', Colors.BRIGHTYELLOW, 'italic'),
          inferredConfig.git
        )
        .option(
          styleText('-i, --install', Colors.BRIGHTRED, null),
          styleText('Install dependencies', Colors.BRIGHTYELLOW, 'italic'),
          inferredConfig.dependencies.install
        )
        .option(
          styleText('-l, --language <language>', Colors.BRIGHTRED, null),
          styleText(`${Language.JS} || ${Language.TS}`, Colors.BRIGHTYELLOW, 'italic'),
          inferredConfig.language
        )
        .option(
          styleText('-u, --update', Colors.BRIGHTRED, null),
          styleText('Update dependencies', Colors.BRIGHTYELLOW, 'italic'),
          inferredConfig.dependencies.update
        )
        .option(
          styleText('-r, --runner <runner>', Colors.BRIGHTRED, null),
          styleText(`${Runner.NPM} || ${Runner.YARN}`, Colors.BRIGHTYELLOW, 'italic'),
          inferredConfig.runner
        )
        .option(
          styleText('-s, --style <style>', Colors.BRIGHTRED, null),
          styleText(
            `${Style.NONE} || ${Style.STYLEDCOMPONENTS} || ${Style.TWINMACRO}`,
            Colors.BRIGHTYELLOW,
            'italic'
          ),
          inferredConfig.style
        )
        .name(styleText('@yondav/react-starter', Colors.BRIGHTMAGENTA, 'underline'))
        .usage(styleText('[projectName] [options]', Colors.BRIGHTMAGENTA, 'underline'));

      const flagOptions = program.opts<Flags>();

      program.parse(process.argv);

      const flagConfig: Partial<ScriptConfig> = {
        author: inferredConfig.author,
        bundler: flagOptions.bundler ?? inferredConfig.bundler,
        dependencies: {
          install: flagOptions.install ?? inferredConfig.dependencies.install,
          update: flagOptions.update ?? inferredConfig.dependencies.update,
        },
        description: inferredConfig.description,
        git: flagOptions.git ?? inferredConfig.git,
        language: flagOptions.language ?? inferredConfig.language,
        license: inferredConfig.license,
        runner: flagOptions.runner ?? inferredConfig.runner,
        style: flagOptions.style ?? inferredConfig.style,
        version: inferredConfig.version,
        projectName: program.args[0],
      };

      resolve(flagConfig);
    } catch (err) {
      reject(err);
    }
  });
}

// export default async function flags(): Promise<ScriptConfig> {
//   return new Promise<ScriptConfig>((resolve, reject) => {
//     try {
//       const cli = meow(
//         `
//         Usage
//           $ npx @yondav/react-starter <project-name> [options]

//           Options

//           --help, -h  Show this help message and exit.
//           --version, -v  Show version number and exit.

//           Description
//           The project will be written in a directory called react-starter inside the directory the command is executed if no output-folder provided.
//           `,
//         {
//           // importMeta: import.meta,
//           flags: {
//             javascript: {
//               type: 'boolean',
//               alias: 'js',
//               default: false,
//             },
//             latest: {
//               type: 'boolean',
//               alias: 'l',
//               default: false,
//             },
//             'no-git': {
//               type: 'boolean',
//               default: false,
//             },
//             'no-install': {
//               type: 'boolean',
//               default: false,
//             },
//             npm: {
//               type: 'boolean',
//               default: false,
//             },
//             parcel: {
//               type: 'boolean',
//               alias: 'p',
//               default: false,
//             },
//             'styled-components': {
//               type: 'boolean',
//               alias: 'sc',
//               default: false,
//             },
//             typescript: {
//               type: 'boolean',
//               alias: 'ts',
//               default: true,
//             },
//             twin: {
//               type: 'boolean',
//               alias: 'tw',
//               default: false,
//             },
//             webpack: {
//               type: 'boolean',
//               alias: 'wp',
//               default: true,
//             },
//             yarn: {
//               type: 'boolean',
//               default: true,
//             },
//           },
//         }
//       );

//       const [projectName] = cli.input;

//       const config: ScriptConfig = {
//         ...inferredConfig,
//         bundler: (() => {
//           if (cli.flags.parcel) return Bundler.PARCEL;
//           if (cli.flags.webpack) return Bundler.WEBPACK;
//           return inferredConfig.bundler;
//         })(),
//         dependencies: (() => {
//           const obj = inferredConfig.dependencies;

//           if (cli.flags.noInstall) obj.install = false;
//           if (cli.flags.latest) obj.update = true;

//           return obj;
//         })(),
//         git: (() => {
//           if (cli.flags.noGit) return false;
//           return inferredConfig.git;
//         })(),
//         language: (() => {
//           if (cli.flags.typescript) return Language.TS;
//           if (cli.flags.javascript) return Language.JS;
//           return inferredConfig.language;
//         })(),
//         runner: (() => {
//           if (cli.flags.yarn) return Runner.YARN;
//           if (cli.flags.npm) return Runner.NPM;
//           return inferredConfig.runner;
//         })(),
//         style: (() => {
//           if (cli.flags.styledComponents) return Style.STYLEDCOMPONENTS;
//           if (cli.flags.twin) return Style.TWINMACRO;
//           return inferredConfig.style;
//         })(),
//         projectName: projectName || inferredConfig.projectName,
//       };

//       resolve(config);
//     } catch (err) {
//       reject(err);
//     }
//   });
// }
