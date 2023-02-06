import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import './styles/app.css';
import MainLayout from './views/MainLayout';

export default function App() {
  useEffect(() => {
    console.log({ envVar: process.env.TEST_VAR });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
