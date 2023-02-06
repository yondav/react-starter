import type { ScriptConfig } from '../../utils/types';
import { licenses } from '../licenses';

export function readmeBody({
  author,
  description,
  projectName,
  license,
  version,
}: Pick<
  ScriptConfig,
  'author' | 'description' | 'projectName' | 'license' | 'version'
>): string {
  const licenseBadge = licenses.find(lic => lic.name === license) ?? licenses[0];

  return `<a id="readme-top"></a>

  [![License](${licenseBadge.badge})](${licenseBadge.url})
  
  <div align="center">
  <h1 align="center">${projectName}  <span style="font-size: 12px; color: grey;">${version}</span></h1>
  <p align="center">${description}</p>

  </div>
  <br />
  
  <!-- TABLE OF CONTENTS -->
  <details>
    <summary style="font-size: 18px;">Table of Contents</summary>
    <ol>
      <li>
        <a href="#about-the-project">About The Project</a>
        <ul>
          <li><a href="#built-with">Built With</a></li>
        </ul>
      </li>
      <li>
        <a href="#getting-started">Getting Started</a>
        <ul>
          <li><a href="#prerequisites">Prerequisites</a></li>
          <li><a href="#installation">Installation</a></li>
        </ul>
      </li>
      <li><a href="#usage">Usage</a></li>
      <li><a href="#roadmap">Roadmap</a></li>
      <li><a href="#contributing">Contributing</a></li>
      <li><a href="#license">License</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#acknowledgments">Acknowledgments</a></li>
    </ol>
  </details>
  <br/>
  
  <!-- ABOUT THE PROJECT -->
  ## About The Project
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  Built With
  
  [![React][React.js]][React-url]
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  <!-- GETTING STARTED -->
  ## Getting Started
  
  ### Prerequisites
  
  ### Installation
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  <!-- USAGE EXAMPLES -->
  ## Usage
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  <!-- ROADMAP -->
  ## Roadmap
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  <!-- CONTRIBUTING -->
  ## Contributing
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  <!-- LICENSE -->
  ## License
  
  Distributed under the [${licenseBadge.name}](${licenseBadge.url}).
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  <!-- CONTACT -->
  ## Contact
  <a href="mailto:${author.email}">${author.email}</a>
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  <!-- ACKNOWLEDGMENTS -->
  ## Acknowledgments
  
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
  [React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
  [React-url]: https://reactjs.org/

  ---
<div align="center">
  <p style="color: grey;">&#169; ${author.name} ${new Date().getFullYear()}</p>
  ${
    author.homepage
      ? `<a href="${author.homepage}" target="_blank" rel="noopener noreferrer">yondav.us</a>`
      : ''
  }
</div>
  `;
}
