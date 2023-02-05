enum Bundler {
  WEBPACK = 'webpack',
  PARCEL = 'parcel',
}

enum Colors {
  RED = '#a13a38',
  BRIGHTRED = '#f77260',
  GREEN = '#029745',
  BRIGHTGREEN = '#5ce087',
  YELLOW = '#f2c655',
  BRIGHTYELLOW = '#e8d26d',
  BLUE = '#154CBD',
  BRIGHTBLUE = '#00ddf4',
  MAGENTA = '#913e88',
  BRIGHTMAGENTA = '#ffa7f6',
  CYAN = '#007086',
  BRIGHTCYAN = '#24dfc4',
}

enum Language {
  JS = 'javascript',
  TS = 'typescript',
}

enum LicenseName {
  MIT = 'MIT License',
  GNULGPL = 'GNU Lesser General Public License v3.0',
  MOZ = 'Mozilla Public License 2.0',
  GNU = 'GNU Affero General Public License v3.0',
  UNL = 'The Unlicense',
  APC = 'Apache License 2.0',
}

enum Runner {
  NPM = 'npm',
  YARN = 'yarn',
}

enum Style {
  STYLEDCOMPONENTS = 'styled-components',
  TWINMACRO = 'twin-macro',
  NONE = 'none',
}

export { Bundler, Colors, Language, LicenseName, Runner, Style };
