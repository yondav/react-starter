// @ts-nocheck

import React from 'react';
import { Outlet } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

const MainWrapper = styled.div(
  tw`h-full w-full flex flex-col justify-center items-center`
);

export default function MainLayout(): JSX.Element {
  return (
    <MainWrapper>
      <Outlet />
    </MainWrapper>
  );
}
