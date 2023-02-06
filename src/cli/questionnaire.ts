import chalk from 'chalk';
import type { DistinctQuestion } from 'inquirer';
import inquirer from 'inquirer';

import { licenses } from '../assets/licenses';
import type { LicenseName } from '../utils/enums';
import { Bundler, Colors, Language, Runner, Style } from '../utils/enums';
import { inferredConfig } from '../utils/inferredConfig';
import type { ScriptConfig } from '../utils/types';

const questions: DistinctQuestion[] = [
  {
    filter: (answer: string) => answer.trim(),
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Project name:'),
    name: 'projectName',
    type: 'input',
    validate: (answer: string) =>
      answer.length > 0 &&
      /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/u.test(answer),
    default: inferredConfig.projectName,
  },
  {
    filter: (answer: string) => answer.trim(),
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Project version:'),
    name: 'version',
    type: 'input',
    validate: (answer: string) =>
      answer.length > 0 && /^(\d+\.)?(\d+\.)?(\*|\d+)$/u.test(answer),
    default: inferredConfig.version,
  },
  {
    filter: (answer: string) => answer.trim(),
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Project description:'),
    name: 'description',
    type: 'input',
    validate: (answer: string) => answer.length > 0,
    default: inferredConfig.description,
  },
  {
    filter: (answer: string) => answer.trim(),
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold("Author's name:"),
    name: 'authorName',
    type: 'input',
    default: inferredConfig.author.name,
  },
  {
    filter: (answer: string) => answer.trim(),
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold("Author's email:"),
    name: 'authorEmail',
    type: 'input',
    default: inferredConfig.author.email,
  },
  {
    filter: (answer: string) => answer.trim(),
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold("Author's homepage:"),
    name: 'authorHomepage',
    type: 'input',
    default: inferredConfig.author.homepage,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Select a license:'),
    name: 'license',
    type: 'list',
    choices: licenses.map(license => license.name),
    default: inferredConfig.license,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Select a template:'),
    name: 'language',
    type: 'list',
    choices: [
      {
        name: chalk.hex(Colors.BRIGHTYELLOW)(Language.JS),
        value: Language.JS,
      },
      {
        name: chalk.hex(Colors.BLUE)(Language.TS),
        value: Language.TS,
      },
    ],
    default: inferredConfig.language,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Select a bundler:'),
    name: 'bundler',
    type: 'list',
    choices: [
      {
        name: chalk.hex(Colors.BRIGHTCYAN)(Bundler.WEBPACK),
        value: Bundler.WEBPACK,
      },
      {
        name: chalk.hex(Colors.BRIGHTRED)(Bundler.PARCEL),
        value: Bundler.PARCEL,
      },
    ],
    default: inferredConfig.bundler,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Select a style library:'),
    name: 'style',
    type: 'list',
    choices: [
      {
        name: chalk.hex(Colors.BRIGHTRED)(Style.STYLEDCOMPONENTS),
        value: Style.STYLEDCOMPONENTS,
      },
      {
        name: chalk.hex(Colors.BRIGHTBLUE)(Style.TWINMACRO),
        value: Style.TWINMACRO,
      },
      {
        name: chalk.white(Style.NONE),
        value: Style.NONE,
      },
    ],
    default: inferredConfig.style,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Initialize git repo?'),
    name: 'git',
    type: 'confirm',
    default: inferredConfig.git,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA).bold('Select a runner:'),
    name: 'runner',
    type: 'list',
    choices: [
      {
        name: chalk.hex(Colors.RED)`npm`,
        value: Runner.NPM,
      },
      {
        name: chalk.hex(Colors.BRIGHTYELLOW)`yarn`,
        value: Runner.YARN,
      },
    ],
    default: inferredConfig.runner,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA)('Install dependencies?'),
    name: 'install',
    type: 'confirm',
    default: inferredConfig.dependencies.install,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA)('Update dependencies?'),
    suffix: chalk.gray.italic('\n(could lead to breaking changes)'),
    name: 'update',
    type: 'confirm',
    default: inferredConfig.dependencies.update,
  },
  {
    message: chalk.hex(Colors.BRIGHTMAGENTA)('Add configuration for Jest?'),
    name: 'test',
    type: 'confirm',
    default: inferredConfig.test,
  },
];

export default async function questionnaire(): Promise<ScriptConfig> {
  const {
    authorEmail,
    authorHomepage,
    authorName,
    bundler,
    description,
    git,
    install,
    language,
    license,
    projectName,
    runner,
    style,
    update,
    test,
    version,
  } = (await inquirer.prompt(questions)) as {
    readonly authorEmail: string;
    readonly authorHomepage: string;
    readonly authorName: string;
    readonly bundler: Bundler;
    readonly description: string;
    readonly git: boolean;
    readonly install: boolean;
    readonly language: Language;
    readonly license: LicenseName;
    readonly projectName: string;
    readonly runner: Runner;
    readonly style: Style;
    readonly update: boolean;
    readonly test: boolean;
    readonly version: string;
  };

  return {
    author: { name: authorName, email: authorEmail, homepage: authorHomepage },
    bundler,
    dependencies: { install, update },
    git,
    description,
    language,
    license,
    projectName,
    runner,
    style,
    test,
    version,
  };
}
