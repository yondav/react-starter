// @ts-nocheck

import type { DefaultTheme } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
${({ theme }: { theme: DefaultTheme }) => ({
  body: {
    backgroundColor: theme.colors.black,
    height: '100vh',
    fontFamily: theme.font.primary,
    color: theme.colors.white,
  },
})}

#root {
  height: 100%;
}
`;
