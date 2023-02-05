import type { Bundler, Language, LicenseName, Runner, Style } from '../enums';

interface ScriptConfig {
  readonly author: {
    name: string;
    email: string;
    homepage: string | null;
  };
  readonly bundler: Bundler;
  readonly dependencies: {
    install: boolean;
    update: boolean;
  };
  readonly description: string;
  readonly git: boolean;
  readonly language: Language;
  readonly license: LicenseName;
  readonly projectName: string;
  readonly runner: Runner;
  readonly style: Style;
  readonly test: boolean;
  readonly version: string;
}

interface Flags {
  readonly bundler?: Bundler;
  readonly git?: boolean;
  readonly install?: boolean;
  readonly language?: Language;
  readonly update?: boolean;
  readonly runner?: Runner;
  readonly style?: Style;
}

interface License {
  readonly name: LicenseName;
  readonly badge: string;
  readonly spdx_id: string;
  readonly url: string;
}

type Licenses = License[];

export type { Flags, ScriptConfig, License, Licenses };
