import { Bundler, Language } from '../../utils/enums';
import type { ScriptConfig } from '../../utils/types';

export function htmlBody({
  bundler,
  language,
}: Pick<ScriptConfig, 'bundler' | 'language'>) {
  return `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffffff" />
  
    <!-- https://favicon.io/favicon-converter/ -->
    <!-- https://metatags.io/ -->
    <!-- Primary Meta Tags -->
    <title>React Starter</title>
    <meta name="title" content="React Starter">
    <meta name="description" content="Built with @yondav/react-starter">
    <link rel="shortcut icon" href="./favicon.ico" />
  
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://metatags.io/">
    <meta property="og:title" content="React Starter">
    <meta property="og:description" content="Built with @yondav/react-starter">
    <meta property="og:image" content="./android-chrome-512X512.png">
  
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://metatags.io/">
    <meta property="twitter:title" content="React Starter">
    <meta property="twitter:description" content="Built with @yondav/react-starter">
    <meta property="twitter:image" content="./android-chrome-512X512.png">
  
    <!-- Manifest -->
    <link rel="manifest" href="./manifest.json" />
  
    <!-- roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet">
  </head>
  
  <body>
    <div id="root"></div>
    ${
      bundler === Bundler.PARCEL
        ? `<script type="module" src="../src/index.${
            language === Language.TS ? 'ts' : 'js'
          }x"></script>`
        : ''
    }
  </body>
  
  </html>`;
}
