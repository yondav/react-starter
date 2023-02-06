// @ts-nocheck

import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout(): JSX.Element {
  return (
    <div className='mainLayout'>
      <Outlet />
    </div>
  );
}
