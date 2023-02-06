import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import root from './root';

const AppStyles = createGlobalStyle({
  ':root': root,

  body: {
    ...tw`bg-black h-screen font-primary text-white`,
  },

  '#root': {
    ...tw`h-full`,
  },
});

export default function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <AppStyles />
    </>
  );
}
