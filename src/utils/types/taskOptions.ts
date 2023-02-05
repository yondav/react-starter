import type { Runner, Language, LicenseName } from '../enums';

interface SpinnerOptions {
  text?: string;
  success?: string;
  fail?: string;
}

interface CopyTaskOptions {
  destination: string;
  directory: string;
}

interface WriteFileOptions {
  destination: string;
  fileName: string;
  body: string;
}

interface MakeDirOptions {
  destination: string;
  dirName: string;
}

interface RemoveCommentsOptions {
  destination: string;
}

interface WritePackageJsonOptions {
  description: string;
  destination: string;
  lang: Language;
  license: LicenseName;
  projectName: string;
  runner: Runner;
}

interface ExecuteCommandOptions {
  command: string;
  cwd: string;
}

interface SpawnCommandOptions {
  command: string;
  args: readonly string[];
}

export type {
  CopyTaskOptions,
  SpinnerOptions,
  WriteFileOptions,
  WritePackageJsonOptions,
  ExecuteCommandOptions,
  SpawnCommandOptions,
  MakeDirOptions,
  RemoveCommentsOptions,
};
