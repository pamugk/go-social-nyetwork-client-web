import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

//const SignIn = lazy(() => import('./pages/SignIn/SignIn'));

import NotFound from 'pages/NotFound';
import Search from 'pages/Search';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import User from 'pages/User';

export default function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
