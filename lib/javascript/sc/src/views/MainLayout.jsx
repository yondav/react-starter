import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function MainLayout() {
  return (
    <MainWrapper>
      <Outlet />
    </MainWrapper>
  );
}
